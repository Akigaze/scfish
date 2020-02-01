package com.yogurt.scfish.dto.param;

import com.yogurt.scfish.entity.User;
import org.junit.Test;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

public class RegisterParamTest {

  @Test
  public void should_convert_to_User_entity() {
    RegisterParam userParam = new RegisterParam("test_user", "Test User", "password1!");

    User user = userParam.convertTo();

    assertThat(user.getUsername(), is("test_user"));
    assertThat(user.getNickname(), is("Test User"));
    assertThat(user.getPassword(), is("password1!"));
  }

  @Test
  public void should_update_properties_of_User_entity() {
    RegisterParam userParam = new RegisterParam("test_user", "Test User", "password1!");
    User user = new User("test_user", "Real User", "helloWorld", true);

    userParam.update(user);

    assertThat(user.getUsername(), is("test_user"));
    assertThat(user.getNickname(), is("Test User"));
    assertThat(user.getPassword(), is("password1!"));
    assertTrue(user.isDeleted());
  }
}
