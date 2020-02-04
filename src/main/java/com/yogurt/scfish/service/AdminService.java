package com.yogurt.scfish.service;

import com.yogurt.scfish.cache.StringCacheStore;
import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.param.LoginParam;
import com.yogurt.scfish.dto.param.RegisterParam;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.BadRequestException;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.exception.NotFoundException;
import com.yogurt.scfish.repository.UserRepository;
import com.yogurt.scfish.security.token.AuthToken;
import com.yogurt.scfish.util.AuthUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.Instant;
import java.util.Optional;

import static com.yogurt.scfish.contstant.TokenEnum.ACCESS_TOKEN;
import static com.yogurt.scfish.contstant.TokenEnum.REFRESH_TOKEN;

@Slf4j
@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AdminService {

  private UserRepository userRepository;

  private UserService userService;

  private final StringCacheStore cacheStore;

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

  public AuthToken authorize(@NonNull LoginParam loginParam) {
    String username = loginParam.getUsername();
    final User user;
    try {
      user = userService.getByUsernameOfNonNull(username);
    } catch (NotFoundException e) {
      log.warn("Could not find by username [{}]", username);
      throw new BadRequestException("incorrect user name or password", e);
    }
    userService.mustNotBeDeleted(user);
    if (!userService.isPasswordMatched(user, loginParam.getPassword())) {
      throw new BadRequestException("incorrect user name or password");
    }
    log.info("login and authorize for user [{}]", user.getUsername());
    return buildAuthTokenFor(user);
  }

  private AuthToken buildAuthTokenFor(@NonNull User user) {
    String accessToken = AuthUtil.randomUUIDWithoutDash();
    String refreshToken = AuthUtil.randomUUIDWithoutDash();

    AuthToken authToken = new AuthToken();
    authToken.setAccessToken(accessToken);
    authToken.setRefreshToken(refreshToken);

    cacheStore.put(accessToken, user.getUsername(), ACCESS_TOKEN.getDuration(), ACCESS_TOKEN.getTimeUnit());
    cacheStore.put(refreshToken, user.getUsername(), REFRESH_TOKEN.getDuration(), REFRESH_TOKEN.getTimeUnit());

    return authToken;
  }

  public AuthToken refreshToken(@NonNull String refreshToken) {
    String username = cacheStore.get(refreshToken).orElseThrow(() -> new BadRequestException("Login status is invalid, please login again").setErrorData(refreshToken));
    User user = userService.getByUsernameOfNonNull(username);
    return buildAuthTokenFor(user);
  }
}
