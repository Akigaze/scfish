package com.yogurt.scfish.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public abstract class BaseException extends RuntimeException {
  @Getter
  private Object errorData;

  public BaseException(String message) {
    super(message);
  }

  public BaseException(String message, Throwable cause) {
    super(message, cause);
  }

  public BaseException setErrorData(Object errorData) {
    this.errorData = errorData;
    return this;
  }

  public abstract HttpStatus getStatus();
}
