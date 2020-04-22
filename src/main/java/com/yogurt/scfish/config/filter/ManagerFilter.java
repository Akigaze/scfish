package com.yogurt.scfish.config.filter;

import com.yogurt.scfish.core.BaseResponse;
import com.yogurt.scfish.security.context.SecurityContext;
import com.yogurt.scfish.security.context.SecurityContextHolder;
import com.yogurt.scfish.service.ManagerService;
import com.yogurt.scfish.util.JsonUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ManagerFilter extends GenericFilterBean {
  private ManagerService managerService;

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    HttpServletRequest httpServletRequest = (HttpServletRequest)request;
    HttpServletResponse httpServletResponse = (HttpServletResponse)response;

    if(httpServletRequest.getServletPath().equals("/scfish/manager/isManager")){
      chain.doFilter(request,response);
      return;
    }

    if(!this.managerService.isManager()){
      HttpStatus status = HttpStatus.FORBIDDEN;

      BaseResponse<String> baseResponse = new BaseResponse<>();
      baseResponse.setMessage("User does not have permission to access");
      baseResponse.setStatus(status.value());
      httpServletResponse.setStatus(status.value());
      httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);
      httpServletResponse.getWriter().write(JsonUtil.objectToJson(baseResponse));
      return;
    }
    chain.doFilter(request,response);
  }
}
