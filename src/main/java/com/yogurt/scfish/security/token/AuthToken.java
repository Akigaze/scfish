package com.yogurt.scfish.security.token;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthToken {
  private String accessToken;
  private long expiredTime;
  private String refreshToken;

}
