package com.yogurt.scfish.core;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
public class BaseResponse<T> {

  public BaseResponse(@NonNull int status, String message, T data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public BaseResponse(@NonNull HttpStatus status, String message, T data) {
    this(status.value(), message, data);
  }

  private Integer status;

  private String message;

  private T data;

  private String devMessage;
}
