package com.yogurt.scfish.config;

import com.yogurt.scfish.contstant.ScfishConstant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class WebInterceptor implements HandlerInterceptor {
  // TODO refine how design the Interceptor
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    String accessTokenInHeader = request.getHeader(ScfishConstant.ACCESS_TOKEN_HEADER_NAME);
    String sessionTokenInHeader = request.getHeader(ScfishConstant.SCFISH_TOKEN_HEADER_NAME);

    if (sessionTokenInHeader == null || accessTokenInHeader == null) {
      return doIntercept(request, response, "miss token in request");
    }
    return true;
  }

  private boolean doIntercept(HttpServletRequest request, HttpServletResponse response, String message) throws IOException {
    log.warn("--- request of {} was filtered: " + message + " ---", request.getRequestURI());
    response.sendRedirect("/login");
    return false;
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

  }
}
