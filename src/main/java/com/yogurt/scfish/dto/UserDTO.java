package com.yogurt.scfish.dto;

import com.yogurt.scfish.entity.User;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
  private String id;
  private String name;
  private String password;
  private boolean enabled = true;

  public User convert() {
    User user = new User();
    return this.convert(user);
  }

  public User convert(User user) {
    BeanUtils.copyProperties(this, user);
    return user;
  }
}
