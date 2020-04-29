package com.yogurt.scfish.contstant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum  ForbiddenEnum {
  ONE_DAY(24*3600),
  THREE_DAYS(3*24*3600),
  SEVEN_DAYS(7*24*3600),
  FIFTEEN_DAYS(15*24*3600),
  A_MONTH(30*24*3600),
  FOREVER((long)99999*24*3600);

  private long duration;
}
