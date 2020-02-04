package com.yogurt.scfish.config.handler;

import com.yogurt.scfish.exception.BaseException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface AuthorizationFailureHandler {
  void handleFailure(HttpServletRequest request, HttpServletResponse response, BaseException e) throws IOException;
}
