package com.yogurt.scfish.dto.param;

import com.yogurt.scfish.entity.User;
import org.junit.Test;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

public class LoginParamTest {

  @Test
  public void should_convert_to_User_entity() {
    LoginParam userParam = new LoginParam("test_user", "password1!");

    User user = userParam.convertTo();

    assertThat(user.getUsername(), is("test_user"));
    assertThat(user.getPassword(), is("password1!"));
  }

  @Test
  public void should_update_properties_of_User_entity() {
    LoginParam userParam = new LoginParam("test_user", "password1!");
    User user = new User("test_user", "Real User", "helloWorld", true);

    userParam.update(user);

    assertThat(user.getUsername(), is("test_user"));
    assertThat(user.getPassword(), is("password1!"));
    assertThat(user.getNickname(), is("Real User"));
    assertTrue(user.isDeleted());
  }
}
