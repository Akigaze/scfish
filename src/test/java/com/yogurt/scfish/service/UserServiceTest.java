package com.yogurt.scfish.service;

import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.ForbiddenException;
import com.yogurt.scfish.exception.NotFoundException;
import com.yogurt.scfish.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {
  @Mock
  private UserRepository userRepository;

  private UserService userService;

  @Before
  public void setUp() throws Exception {
    userService = new UserService(userRepository);
  }

  @Test
  public void should_get_user_by_username_when_user_can_be_found() {
    Optional<User> optionalUser = Optional.of(new User());
    when(userRepository.findByUsername("test-username")).thenReturn(optionalUser);

    User user = userService.getByUsernameOfNonNull("test-username");

    assertThat(user, is(optionalUser.get()));
  }

  @Test
  public void should_throw_NotFoundException_when_user_can_not_be_found_by_username() {
    Optional<User> optionalUser = Optional.empty();
    when(userRepository.findByUsername("test-username")).thenReturn(optionalUser);

    try {
      User user = userService.getByUsernameOfNonNull("test-username");
      fail("don't throw NotFoundException when user can not be found by username");
    } catch (NotFoundException e) {
      assertThat(e.getMessage(), is("user name is not existed"));
      assertThat(e.getErrorData(), is("test-username"));
    }
  }

  @Test
  public void should_throw_ForbiddenException_if_the_given_user_is_deleted_when_do_mustNotBeDeleted() {
    User user = new User();
    user.setUsername("test-username");
    user.setDeleted(true);

    try {
      userService.mustNotBeDeleted(user);
      fail("don't throw ForbiddenException when user is deleted");
    } catch (ForbiddenException e) {
      assertThat(e.getMessage(), is("The user has been forbidden"));
      assertThat(e.getErrorData(), is("test-username"));
    }
  }

  @Test
  public void should_return_true_if_the_user_password_is_matched_with_the_given_password() {
    User user = new User();
    user.setPassword("test-password");

    boolean isMatched = userService.isPasswordMatched(user, "test-password");
    assertTrue(isMatched);
  }

  @Test
  public void should_return_false_if_the_user_password_could_not_match_with_the_given_password() {
    User user = new User();
    user.setPassword("test-password");

    boolean isMatched = userService.isPasswordMatched(user, "test-password!");
    assertFalse(isMatched);
  }

}