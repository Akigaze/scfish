package com.yogurt.scfish.service;

import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.param.LoginParam;
import com.yogurt.scfish.dto.param.RegisterParam;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.repository.UserRepository;
import com.yogurt.scfish.security.token.AuthToken;
import com.yogurt.scfish.util.AuthUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.Instant;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AdminService {

  private UserRepository userRepository;

  public void addUser(@NonNull RegisterParam registerParam) {
    if (this.userRepository.existsById(registerParam.getUsername())) {
      throw new DuplicatedException("user id already existed").setErrorData(registerParam);
    }
    User user = registerParam.convertTo();
    this.userRepository.save(user);
  }

  @NonNull
  public Optional<User> validate(@NonNull LoginParam loginParam) {
    return this.userRepository.findByUsernameAndPassword(loginParam.getUsername(), loginParam.getPassword());
  }

  // TODO is it reasonable to set token in session, maybe better to use customized Context?
  @NonNull
  public AuthToken authorize(HttpServletRequest request, @NonNull User user) {
    HttpSession session = request.getSession(true);
    session.setAttribute(SessionAttribute.USER, user);
    session.setAttribute(SessionAttribute.USER_NAME, user.getUsername());

    String sessionToken = AuthUtil.randomUUIDWithoutDash();
    Instant tokenExpiredInstant = Instant.now().plusSeconds(AuthUtil.TOKEN_EXPIRED_SECONDS);
    AuthToken authToken = new AuthToken(sessionToken, tokenExpiredInstant.getEpochSecond(), null);
    session.setAttribute(SessionAttribute.USER_SESSION_TOKEN, authToken);

    return authToken;
  }

  public boolean validate(HttpServletRequest request, @Nullable String sessionToken) {
    if (sessionToken == null || sessionToken.isEmpty()) {
      return false;
    }
    HttpSession session = request.getSession(true);
    AuthToken authToken = (AuthToken) session.getAttribute(SessionAttribute.USER_SESSION_TOKEN);
    return sessionToken.equals(authToken.getRefreshToken()) && !AuthUtil.isTokenExpired(authToken);
  }

  public String access(HttpServletRequest request) {
    String accessToken = AuthUtil.randomUUIDWithoutDash();
    HttpSession session = request.getSession(true);
    session.setAttribute(SessionAttribute.USER_ACCESS_TOKEN, accessToken);
    return accessToken;
  }
}
