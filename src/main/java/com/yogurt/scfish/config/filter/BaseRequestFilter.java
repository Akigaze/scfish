package com.yogurt.scfish.config.filter;

import com.yogurt.scfish.contstant.ScfishConstant;
import org.springframework.lang.NonNull;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

public interface BaseRequestFilter {
  default String getTokenFromRequest(@NonNull HttpServletRequest request) {
    String tokenInHeader = request.getHeader(ScfishConstant.ACCESS_TOKEN_HEADER_NAME);
    if (StringUtils.isEmpty(tokenInHeader)){
      tokenInHeader = request.getParameter(ScfishConstant.ACCESS_TOKEN_REQUEST_PARAM_NAME);
    }
    return tokenInHeader;
  }
}
