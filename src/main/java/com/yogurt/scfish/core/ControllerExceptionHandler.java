package com.yogurt.scfish.core;

import com.yogurt.scfish.exception.BaseException;
import com.yogurt.scfish.util.ExceptionUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice("com.yogurt.scfish.controller")
public class ControllerExceptionHandler {

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<BaseResponse<Object>> handleDuplicationException(BaseException e){
    HttpStatus status = e.getStatus();

    BaseResponse<Object> baseResponse = new BaseResponse<>();

    baseResponse.setData(e.getErrorData());
    baseResponse.setMessage(e.getMessage());
    baseResponse.setDevMessage(ExceptionUtil.getStackTrace(e));
    baseResponse.setStatus(status.value());

    return ResponseEntity.status(status).body(baseResponse);
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public BaseResponse<Object> handleCommonException(Exception e){
    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
    BaseResponse<Object> baseResponse = new BaseResponse<>(status, status.getReasonPhrase(), null);
    baseResponse.setDevMessage(ExceptionUtil.getStackTrace(e));
    return baseResponse;
  }

}
