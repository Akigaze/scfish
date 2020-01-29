package com.yogurt.scfish.config;

import com.yogurt.scfish.contstant.SessionAttribute;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.DigestUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
public class WebInterceptor implements HandlerInterceptor {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    HttpSession session = request.getSession(true);
    Object userId = session.getAttribute(SessionAttribute.USER_ID);
    Object userToken = session.getAttribute(SessionAttribute.USER_TOKEN);
    if (userToken != null && userId != null && userToken.toString().equals(DigestUtils.md5DigestAsHex(userId.toString().getBytes()))) {
      return true;
    }
    log.warn("--- request of {} was filtered ---", request.getRequestURI());
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
