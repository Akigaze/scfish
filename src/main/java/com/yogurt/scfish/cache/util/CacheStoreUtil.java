package com.yogurt.scfish.cache.util;

import com.yogurt.scfish.entity.User;
import org.springframework.lang.NonNull;

public class CacheStoreUtil {
  public final static String REFRESH_TOKEN_KEY_PREFIX = "scfish.refresh.token.";
  public final static String ACCESS_TOKEN_KEY_PREFIX = "scfish.access.token.";

  @NonNull
  public static String buildAccessTokenKey(@NonNull User user) {
    return ACCESS_TOKEN_KEY_PREFIX + user.getUsername();
  }

  @NonNull
  public static String buildAccessTokenKey(@NonNull String token) {
    return ACCESS_TOKEN_KEY_PREFIX + token;
  }

  @NonNull
  public static String buildRefreshTokenKey(@NonNull User user) {
    return REFRESH_TOKEN_KEY_PREFIX + user.getUsername();
  }

  @NonNull
  public static String buildRefreshTokenKey(@NonNull String token) {
    return REFRESH_TOKEN_KEY_PREFIX + token;
  }
}
