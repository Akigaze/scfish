package com.yogurt.scfish.core;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BaseResponse<T> {

  private Integer status;

  private String message;

  private T data;

  private String devMessage;
}
