package com.yogurt.scfish.config.handler;

import com.yogurt.scfish.core.BaseResponse;
import com.yogurt.scfish.exception.BaseException;
import com.yogurt.scfish.util.ExceptionUtil;
import com.yogurt.scfish.util.JsonUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class DefaultAuthorizationFailureHandler implements AuthorizationFailureHandler {
  @Override
  public void handleFailure(HttpServletRequest request, HttpServletResponse response, BaseException e) throws IOException {
    BaseResponse<Object> errorResponse = new BaseResponse<>();

    errorResponse.setStatus(e.getStatus().value());
    errorResponse.setMessage(e.getMessage());
    errorResponse.setData(e.getErrorData());

    if (log.isDebugEnabled()) {
      errorResponse.setDevMessage(ExceptionUtil.getStackTrace(e));
    }

    response.setStatus(e.getStatus().value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.getWriter().write(JsonUtil.objectToJson(errorResponse));
  }
}
