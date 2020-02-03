package com.yogurt.scfish.cache;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryCacheStore extends StringCacheStore {

  private final ConcurrentHashMap<String, CacheWrapper<String>> CACHE_CONTAINER = createCacheContainer();

  private ConcurrentHashMap<String, CacheWrapper<String>> createCacheContainer() {
    return new ConcurrentHashMap<>();
  }

  @Override
  Optional<CacheWrapper<String>> getInternal(String key) {
    return Optional.ofNullable(CACHE_CONTAINER.get(key));
  }

  @Override
  void putInternal(String key, CacheWrapper<String> cacheWrapper) {
    CACHE_CONTAINER.put(key, cacheWrapper);
  }

  @Override
  boolean putInternalIfAbsent(String key, CacheWrapper<String> cacheWrapper) {
    synchronized (CACHE_CONTAINER) {
      Optional<CacheWrapper<String>> optionalCacheWrapper = getInternal(key);
      if (optionalCacheWrapper.isPresent()) {
        return false;
      }
      putInternal(key, cacheWrapper);
      return true;
    }
  }

  @Override
  public void delete(String key) {
    CACHE_CONTAINER.remove(key);
  }
}
