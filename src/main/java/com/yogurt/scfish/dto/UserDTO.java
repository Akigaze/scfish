package com.yogurt.scfish.dto;

import com.yogurt.scfish.entity.User;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
  private String userId;
  private String userName;
  private String password;
  private boolean enabled = true;

  public User convert() {
    User user = new User();
    BeanUtils.copyProperties(this, user);
    return user;
  }

  public User convert(User user) {
    BeanUtils.copyProperties(this, user);
    return user;
  }
}
