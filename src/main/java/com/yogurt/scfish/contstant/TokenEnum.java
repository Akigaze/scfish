package com.yogurt.scfish.contstant;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;

@Getter
@AllArgsConstructor
public enum TokenEnum {
  ACCESS_TOKEN(5 * 3600, ChronoUnit.SECONDS),
  REFRESH_TOKEN(10, ChronoUnit.DAYS);

  private Integer duration;

  private TemporalUnit timeUnit;
}
