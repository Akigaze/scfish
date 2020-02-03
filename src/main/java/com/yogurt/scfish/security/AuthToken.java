package com.yogurt.scfish.security;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AuthToken {
  private String sessionToken;
  private String accessToken;
  private long expiredTime;

}
