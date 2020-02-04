package com.yogurt.scfish.security.token;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class AuthToken {
  private String sessionToken;
  private String accessToken;
  private long expiredTime;

}
