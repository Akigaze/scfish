package com.yogurt.scfish.dto.param;

import com.yogurt.scfish.dto.base.InputConverter;
import com.yogurt.scfish.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserParam implements InputConverter<User> {
  private String id;
  private String name;
  private String password;
  private boolean enabled = true;

}
