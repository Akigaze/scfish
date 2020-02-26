package com.yogurt.scfish.service;

import com.yogurt.scfish.cache.StringCacheStore;
import com.yogurt.scfish.cache.util.CacheStoreUtil;
import com.yogurt.scfish.dto.UserDTO;
import com.yogurt.scfish.dto.param.LoginParam;
import com.yogurt.scfish.dto.param.RegisterParam;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.BadRequestException;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.exception.NotFoundException;
import com.yogurt.scfish.repository.UserRepository;
import com.yogurt.scfish.security.authorization.Authorization;
import com.yogurt.scfish.security.context.SecurityContext;
import com.yogurt.scfish.security.context.SecurityContextHolder;
import com.yogurt.scfish.security.token.AuthToken;
import com.yogurt.scfish.util.AuthUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

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
      throw new DuplicatedException("user id already existed").setErrorData(registerParam.getUsername());
    }
    User user = registerParam.convertTo();
    userRepository.save(user);
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

  public AuthToken refreshToken(@NonNull String refreshToken) {
    String username = cacheStore.get(CacheStoreUtil.buildRefreshTokenKey(refreshToken)).orElseThrow(() -> new BadRequestException("Login status is invalid, please login again").setErrorData(refreshToken));
    User user = userService.getByUsernameOfNonNull(username);

    cacheStore.get(CacheStoreUtil.buildAccessTokenKey(user)).ifPresent(accessToken -> {
      cacheStore.delete(CacheStoreUtil.buildAccessTokenKey(accessToken));
      cacheStore.delete(CacheStoreUtil.buildRefreshTokenKey(refreshToken));
      cacheStore.delete(CacheStoreUtil.buildAccessTokenKey(user));
      cacheStore.delete(CacheStoreUtil.buildRefreshTokenKey(user));
    });

    return buildAuthTokenFor(user);
  }

  public void clearToken() {
    Authorization authorization = SecurityContextHolder.getContext().getAuthorization();
    if (authorization == null) {
      throw new BadRequestException("You are not logged in, cannot logout");
    }
    User user = authorization.getUserDetail().getUser();

    cacheStore.get(CacheStoreUtil.buildAccessTokenKey(user)).ifPresent(accessToken -> {
      cacheStore.delete(CacheStoreUtil.buildAccessTokenKey(accessToken));
      cacheStore.delete(CacheStoreUtil.buildAccessTokenKey(user));
    });

    cacheStore.get(CacheStoreUtil.buildRefreshTokenKey(user)).ifPresent(refreshToken -> {
      cacheStore.delete(CacheStoreUtil.buildRefreshTokenKey(refreshToken));
      cacheStore.delete(CacheStoreUtil.buildRefreshTokenKey(user));
    });
  }

  private AuthToken buildAuthTokenFor(@NonNull User user) {
    String accessToken = AuthUtil.randomUUIDWithoutDash();
    String refreshToken = AuthUtil.randomUUIDWithoutDash();

    AuthToken authToken = new AuthToken();
    authToken.setAccessToken(accessToken);
    authToken.setRefreshToken(refreshToken);

    cacheStore.put(CacheStoreUtil.buildAccessTokenKey(accessToken), user.getUsername(), ACCESS_TOKEN.getDuration(), ACCESS_TOKEN.getTimeUnit());
    cacheStore.put(CacheStoreUtil.buildRefreshTokenKey(refreshToken), user.getUsername(), REFRESH_TOKEN.getDuration(), REFRESH_TOKEN.getTimeUnit());

    cacheStore.put(CacheStoreUtil.buildAccessTokenKey(user), accessToken, ACCESS_TOKEN.getDuration(), ACCESS_TOKEN.getTimeUnit());
    cacheStore.put(CacheStoreUtil.buildRefreshTokenKey(user), refreshToken, REFRESH_TOKEN.getDuration(), REFRESH_TOKEN.getTimeUnit());

    return authToken;
  }

  public void modifyUser(@NonNull UserDTO newProfile) {
    SecurityContext context = SecurityContextHolder.getContext();
    User user = context.getAuthorizedUser();
    user.setNickname(newProfile.getNickname());
    userRepository.save(user);
  }

  public void updateAvatar(@NonNull byte[] newAvatar) {
    SecurityContext context = SecurityContextHolder.getContext();
    User user = context.getAuthorizedUser();
    user.setAvatar(newAvatar);
    userRepository.save(user);
  }
}
