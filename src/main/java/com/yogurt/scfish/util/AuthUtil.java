package com.yogurt.scfish.util;

import com.yogurt.scfish.security.AuthToken;
import org.springframework.lang.NonNull;
import org.springframework.util.DigestUtils;

import java.time.Instant;
import java.util.UUID;

public class AuthUtil {

  public static int TOKEN_EXPIRED_SECONDS = 24 * 3600;

  @NonNull
  public static String randomUUIDWithoutDash(){
    return UUID.randomUUID().toString().replaceAll("-", "");
  }

  @NonNull
  public static boolean isTokenExpired(@NonNull AuthToken authToken) {
    long expiredTimeOfSeconds = authToken.getExpiredTime();
    long currentTimeOfSeconds = Instant.now().getEpochSecond();
    return expiredTimeOfSeconds <= currentTimeOfSeconds;
  }
}
