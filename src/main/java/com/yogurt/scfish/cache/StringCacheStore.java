package com.yogurt.scfish.cache;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.yogurt.scfish.util.JsonUtil;

import java.io.IOException;
import java.time.temporal.TemporalUnit;
import java.util.Optional;

public abstract class StringCacheStore extends AbstractCacheStore<String, String> {
  public <T> void putAny(String key, T value) {
    try {
      put(key, JsonUtil.objectToJson(value));
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
  }


  public <T> void putAny(String key, T value, int timeout, TemporalUnit unit) {
    try {
      put(key, JsonUtil.objectToJson(value), timeout, unit);
    } catch (JsonProcessingException e) {
      e.printStackTrace();
    }
  }

  public <T> Optional<T> getAny(String key, Class<T> type) {
    return get(key).map(value -> {
      try {
        return JsonUtil.jsonToObject(value, type);
      } catch (IOException e) {
        return null;
      }
    });
  }

}
