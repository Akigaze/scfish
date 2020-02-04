package com.yogurt.scfish.config.filter;

import com.yogurt.scfish.config.handler.AuthorizationFailureHandler;
import com.yogurt.scfish.config.handler.DefaultAuthorizationFailureHandler;
import com.yogurt.scfish.security.context.SecurityContextHolder;
import lombok.Setter;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public abstract class AbstractAuthorizationFilter extends OncePerRequestFilter {
  private AntPathMatcher antPathMatcher;

  private Set<String> excludePathPatterns = new HashSet<>();

  @Setter
  private AuthorizationFailureHandler failureHandler;

  public AbstractAuthorizationFilter(AuthorizationFailureHandler failureHandler) {
    this.failureHandler = failureHandler;
    this.antPathMatcher = new AntPathMatcher();
  }

  protected abstract void doAuthorize(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException;

  AuthorizationFailureHandler getFailureHandler() {
    if (this.failureHandler == null) {
      this.failureHandler = new DefaultAuthorizationFailureHandler();
    }
    return failureHandler;
  }

  public void addExcludePathPatterns(String... patterns) {
    Collections.addAll(this.excludePathPatterns, patterns);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
    return excludePathPatterns.stream().anyMatch(pattern -> antPathMatcher.match(pattern, request.getServletPath()));
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    if (shouldNotFilter(request)) {
      filterChain.doFilter(request, response);
      return;
    }
    try {
      doAuthorize(request, response, filterChain);
    } finally {
      SecurityContextHolder.clearContext();
    }
  }
}
