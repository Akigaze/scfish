package com.yogurt.scfish.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.lang.NonNull;

import java.io.IOException;

public class JsonUtil {
  private final static ObjectMapper MAPPER = new ObjectMapper();

  public static <T> String objectToJson(@NonNull T value) throws JsonProcessingException {
    return MAPPER.writeValueAsString(value);
  }

  public static <T> T jsonToObject(@NonNull String value, @NonNull Class<T> type) throws IOException {
    return MAPPER.readValue(value, type);
  }
}
