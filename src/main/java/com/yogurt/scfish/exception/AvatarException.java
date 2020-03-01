package com.yogurt.scfish.exception;

import org.springframework.http.HttpStatus;

public class AvatarException extends BaseException {
  public AvatarException(String message, Throwable cause) {
    super(message, cause);
  }

  @Override
  public HttpStatus getStatus() {
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
