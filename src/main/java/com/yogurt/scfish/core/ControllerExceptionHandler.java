package com.yogurt.scfish.core;

import com.yogurt.scfish.exception.AvatarException;
import com.yogurt.scfish.exception.BaseException;
import com.yogurt.scfish.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice("com.yogurt.scfish.controller")
public class ControllerExceptionHandler {

  @ExceptionHandler(AvatarException.class)
  public ResponseEntity<Object> handleAvatarException(AvatarException e) {
    return ResponseEntity.status(e.getStatus()).body(e.getMessage());
  }

  @ExceptionHandler(BaseException.class)
  public ResponseEntity<BaseResponse<Object>> handleBaseException(BaseException e) {
    HttpStatus status = e.getStatus();
    BaseResponse<Object> baseResponse = this.buildBaseResponse(e);
    baseResponse.setData(e.getErrorData());
    baseResponse.setStatus(status.value());
    return ResponseEntity.status(status).body(baseResponse);
  }

  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public BaseResponse<Object> handleCommonException(Exception e) {
    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
    BaseResponse<Object> baseResponse = this.buildBaseResponse(e);
    baseResponse.setStatus(status.value());
    baseResponse.setMessage(status.getReasonPhrase());
    return baseResponse;
  }

  private <T> BaseResponse<T> buildBaseResponse(@NonNull Throwable t) {
    log.error("Controller capture an exception: ", t);
    BaseResponse<T> baseResponse = new BaseResponse<>();
    baseResponse.setMessage(t.getMessage());
    if (log.isDebugEnabled()) {
      baseResponse.setDevMessage(ExceptionUtil.getStackTrace(t));
    }
    return baseResponse;
  }

}
