package com.yogurt.scfish.exception;

import org.springframework.http.HttpStatus;

public class AvatarNoSettingException extends AvatarException {

  public AvatarNoSettingException(String message) {
    super(message, null);
  }

  @Override
  public HttpStatus getStatus() {
    return HttpStatus.NO_CONTENT;
  }
}
