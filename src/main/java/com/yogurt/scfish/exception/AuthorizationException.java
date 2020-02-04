package com.yogurt.scfish.exception;

import org.springframework.http.HttpStatus;

public class AuthorizationException extends BaseException {
  public AuthorizationException(String message) {
    super(message);
  }

  public AuthorizationException(String message, Throwable cause) {
    super(message, cause);
  }

  @Override
  public HttpStatus getStatus() {
    return HttpStatus.UNAUTHORIZED;
  }
}
