package com.yogurt.scfish.dto;

import com.yogurt.scfish.dto.param.UserParam;
import com.yogurt.scfish.entity.User;
import org.junit.Test;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

public class UserParamTest {

  @Test
  public void should_convert_to_User_entity() {
    UserParam userParam = new UserParam("test_user", "Test User", "password1!", true);

    User user = userParam.convertTo();

    assertThat(user.getId(), is("test_user"));
    assertThat(user.getName(), is("Test User"));
    assertThat(user.getPassword(), is("password1!"));
    assertTrue(user.isEnabled());
  }

  @Test
  public void should_update_properties_of_User_entity() {
    UserParam userParam = new UserParam("test_user", "Test User", "password1!", true);
    User user = new User("test_user", "Real User", "helloWorld", false);

    userParam.update(user);

    assertThat(user.getId(), is("test_user"));
    assertThat(user.getName(), is("Test User"));
    assertThat(user.getPassword(), is("password1!"));
    assertTrue(user.isEnabled());
  }
}
