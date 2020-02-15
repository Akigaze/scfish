package com.yogurt.scfish.dto.param;

import com.yogurt.scfish.dto.base.InputConverter;
import com.yogurt.scfish.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterParam implements InputConverter<User> {
  private String username;
  private String nickname;
  private String password;
}
