package com.yogurt.scfish.config.filter;

import com.yogurt.scfish.cache.StringCacheStore;
import com.yogurt.scfish.cache.util.CacheStoreUtil;
import com.yogurt.scfish.config.handler.AuthorizationFailureHandler;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.AuthorizationException;
import com.yogurt.scfish.security.authorization.Authorization;
import com.yogurt.scfish.security.context.SecurityContext;
import com.yogurt.scfish.security.context.SecurityContextHolder;
import com.yogurt.scfish.security.support.UserDetail;
import com.yogurt.scfish.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
public class AdminAuthorizationFilter extends AbstractAuthorizationFilter {

  private StringCacheStore cacheStore;

  private UserService userService;

  public AdminAuthorizationFilter(StringCacheStore cacheStore, UserService userService, AuthorizationFailureHandler failureHandler) {
    super(failureHandler);
    this.cacheStore = cacheStore;
    this.userService = userService;
  }

  @Override
  protected void doAuthorize(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
    log.info("-- filter doAuthorize for [{}] --", request.getServletPath());
    String token = this.getTokenFromRequest(request);

    if (StringUtils.isEmpty(token)) {
      getFailureHandler().handleFailure(request, response, new AuthorizationException("No valid token, please login"));
      return;
    }

    Optional<String> optionalUsername = cacheStore.get(CacheStoreUtil.buildAccessTokenKey(token));
    if (!optionalUsername.isPresent()) {
      getFailureHandler().handleFailure(request, response, new AuthorizationException("Token was expired or not existed").setErrorData(token));
      return;
    }

    User user = userService.getByUsernameOfNonNull(optionalUsername.get());
    UserDetail userDetail = new UserDetail(user);
    Authorization authorization = new Authorization(userDetail);
    SecurityContextHolder.setContext(new SecurityContext(authorization));

    filterChain.doFilter(request, response);
  }

}
