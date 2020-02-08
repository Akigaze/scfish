package com.yogurt.scfish.service;

import com.yogurt.scfish.cache.StringCacheStore;
import com.yogurt.scfish.cache.util.CacheStoreUtil;
import com.yogurt.scfish.dto.param.LoginParam;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.BadRequestException;
import com.yogurt.scfish.exception.ForbiddenException;
import com.yogurt.scfish.exception.NotFoundException;
import com.yogurt.scfish.repository.UserRepository;
import com.yogurt.scfish.security.token.AuthToken;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AdminServiceTest {
  @Mock
  private UserService userService;
  @Mock
  private UserRepository userRepository;
  @Mock
  private StringCacheStore cacheStore;

  private AdminService adminService;

  @Before
  public void setUp() throws Exception {
    adminService = new AdminService(userRepository, userService, cacheStore);
  }

  @Test
  public void should_return_AuthToken_if_give_correct_login_param_when_do_authorize() {
    LoginParam loginParam = new LoginParam();
    loginParam.setUsername("test-username");
    loginParam.setPassword("test-password");

    User user = new User();
    user.setUsername("test-username");
    user.setPassword("test-password");
    user.setDeleted(false);
    user.setNickname("Test Nickname");

    when(userService.getByUsernameOfNonNull("test-username")).thenReturn(user);
    when(userService.isPasswordMatched(user, "test-password")).thenReturn(true);

    AuthToken authToken = adminService.authorize(loginParam);

    assertThat(authToken.getAccessToken(), not(isEmptyOrNullString()));
    assertThat(authToken.getRefreshToken(), not(isEmptyOrNullString()));
  }

  @Test
  public void should_throw_BadRequestException_if_could_not_find_user_by_given_login_param_when_do_authorize() {
    LoginParam loginParam = new LoginParam();
    loginParam.setUsername("test-username");
    loginParam.setPassword("test-password");

    when(userService.getByUsernameOfNonNull("test-username")).thenThrow(new NotFoundException("user not found"));

    try {
      AuthToken authToken = adminService.authorize(loginParam);
      fail("don't throw BadRequestException when user not found");
    } catch (BadRequestException e) {
      assertThat(e.getMessage(), is("incorrect user name or password"));
    }
  }

  @Test
  public void should_throw_Exception_if_the_user_is_deleted_when_do_authorize() {
    LoginParam loginParam = new LoginParam();
    loginParam.setUsername("test-username");
    loginParam.setPassword("test-password");

    User user = new User();
    user.setUsername("test-username");
    user.setPassword("test-password");
    user.setDeleted(true);
    user.setNickname("Test Nickname");

    when(userService.getByUsernameOfNonNull("test-username")).thenReturn(user);
    doThrow(new ForbiddenException("The user has been forbidden")).when(userService).mustNotBeDeleted(user);

    try {
      AuthToken authToken = adminService.authorize(loginParam);
      fail("don't throw Exception when user is deleted");
    } catch (Exception e) {
      assertThat(e.getMessage(), is("The user has been forbidden"));
    }
  }

  @Test
  public void should_throw_BadRequestException_if_the_user_password_is_not_matched_when_do_authorize() {
    LoginParam loginParam = new LoginParam();
    loginParam.setUsername("test-username");
    loginParam.setPassword("test-password");

    User user = new User();
    user.setUsername("test-username");
    user.setPassword("test-password");
    user.setDeleted(true);
    user.setNickname("Test Nickname");

    when(userService.getByUsernameOfNonNull("test-username")).thenReturn(user);
    when(userService.isPasswordMatched(user, "test-password")).thenReturn(false);

    try {
      AuthToken authToken = adminService.authorize(loginParam);
      fail("don't throw BadRequestException when password is not matched");
    } catch (BadRequestException e) {
      assertThat(e.getMessage(), is("incorrect user name or password"));
    }
  }

  @Test
  public void should_return_AuthToken_if_could_not_find_username_from_cacheStore_by_refresh_token_when_do_refreshToken() {
    String refreshToken = "test-refresh-token";

    when(cacheStore.get(CacheStoreUtil.buildRefreshTokenKey(refreshToken))).thenReturn(Optional.empty());

    try {
      AuthToken authToken = adminService.refreshToken(refreshToken);
      fail("don't throw BadRequestException when username not found");
    }catch (BadRequestException e){
      assertThat(e.getMessage(), is("Login status is invalid, please login again"));
      assertThat(e.getErrorData(), is(refreshToken));
    }
  }

  @Test
  public void should_throw_BadRequestException_if_username_can_be_found_from_cacheStore_by_refresh_token_when_do_refreshToken() {
    String refreshToken = "test-refresh-token";

    User user = new User();
    user.setUsername("test-username");
    user.setPassword("test-password");
    user.setDeleted(false);
    user.setNickname("Test Nickname");

    when(cacheStore.get(CacheStoreUtil.buildRefreshTokenKey(refreshToken))).thenReturn(Optional.of("test-username"));
    when(userService.getByUsernameOfNonNull("test-username")).thenReturn(user);

    AuthToken authToken = adminService.refreshToken(refreshToken);

    assertThat(authToken.getAccessToken(), not(isEmptyOrNullString()));
    assertThat(authToken.getRefreshToken(), not(isEmptyOrNullString()));
  }
}