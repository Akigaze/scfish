package com.yogurt.scfish.cache;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CacheWrapper<V> {
  private V data;

  private LocalDateTime createdAt;

  private LocalDateTime expiredAt;

}
