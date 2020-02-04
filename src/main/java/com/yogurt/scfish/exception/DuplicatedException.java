package com.yogurt.scfish.exception;

public class DuplicatedException extends BadRequestException {
  public DuplicatedException(String message) {
    super(message);
  }

  public DuplicatedException(String message, Throwable cause) {
    super(message, cause);
  }
}
