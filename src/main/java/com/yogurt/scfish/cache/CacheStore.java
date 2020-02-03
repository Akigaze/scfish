package com.yogurt.scfish.cache;

import org.springframework.lang.NonNull;

import java.time.temporal.TemporalUnit;
import java.util.Optional;

public interface CacheStore<K, V> {

  Optional<V> get(@NonNull K key);

  void put(@NonNull K key, @NonNull V value);

  void put(@NonNull K key, @NonNull V value, int timeout, TemporalUnit unit);

  boolean putIfAbsent(@NonNull K key, @NonNull V value, int timeout, TemporalUnit unit);

  void delete(@NonNull K key);
}
