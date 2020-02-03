package com.yogurt.scfish.cache;

import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;

import java.time.LocalDateTime;
import java.time.temporal.TemporalUnit;
import java.util.Optional;

@Slf4j
public abstract class AbstractCacheStore<K, V> implements CacheStore<K, V> {

  @NonNull
  abstract Optional<CacheWrapper<V>> getInternal(@NonNull K key);

  abstract void putInternal(@NonNull K key, @NonNull CacheWrapper<V> cacheWrapper);

  @NonNull
  abstract boolean putInternalIfAbsent(@NonNull K key, @NonNull CacheWrapper<V> cacheWrapper);

  @Override
  public Optional<V> get(K key) {
    return getInternal(key).map(wrapper -> {
      if (wrapper.getExpiredAt() != null && wrapper.getExpiredAt().isBefore(LocalDateTime.now())) {
        log.warn("Cache key '{}' has been expired", key);
        delete(key);
        return null;
      }
      return wrapper.getData();
    });
  }

  @Override
  public void put(K key, V value) {
    putInternal(key, buildCacheWrapper(value, 0, null));
  }

  @Override
  public void put(K key, V value, int timeout, TemporalUnit unit) {
    putInternal(key, buildCacheWrapper(value, timeout, unit));
  }

  @Override
  public boolean putIfAbsent(K key, V value, int timeout, TemporalUnit unit) {
    return putInternalIfAbsent(key, buildCacheWrapper(value, timeout, unit));
  }

  private CacheWrapper<V> buildCacheWrapper(@NonNull V value, int timeout, TemporalUnit unit) {
    CacheWrapper<V> cacheWrapper = new CacheWrapper<>();
    cacheWrapper.setData(value);
    cacheWrapper.setCreatedAt(LocalDateTime.now());
    LocalDateTime expiredAt = null;
    if (timeout > 0 && unit != null) {
      expiredAt = LocalDateTime.now().plus(timeout, unit);
    }
    cacheWrapper.setExpiredAt(expiredAt);
    return cacheWrapper;
  }
}
