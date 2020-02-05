package com.yogurt.scfish.config.filter;

import com.yogurt.scfish.cache.StringCacheStore;
import com.yogurt.scfish.core.BaseResponse;
import com.yogurt.scfish.util.JsonUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
public class LoginFilter extends OncePerRequestFilter implements BaseRequestFilter {

  private StringCacheStore cacheStore;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
    log.info("-- Login Filter work --");

    String token = this.getTokenFromRequest(request);
    if (StringUtils.isEmpty(token)) {
      chain.doFilter(request, response);
      return;
    }
    // TODO should based on token and username
    Optional<String> optionalUsername = cacheStore.get(token);
    if (optionalUsername.isPresent()) {
      this.handleReplicatedLogin(request, response, optionalUsername.get());
      return;
    }
    chain.doFilter(request, response);
  }

  private void handleReplicatedLogin(HttpServletRequest request, HttpServletResponse response, @NonNull String username) throws IOException {
    log.warn("replicated login: [{}]", username);
    HttpStatus status = HttpStatus.BAD_REQUEST;

    BaseResponse<String> baseResponse = new BaseResponse<>();
    baseResponse.setData(username);
    baseResponse.setStatus(status.value());
    baseResponse.setMessage("User is logged in, please do not login repeatedly");
    response.setStatus(status.value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    response.getWriter().write(JsonUtil.objectToJson(baseResponse));
  }
}
