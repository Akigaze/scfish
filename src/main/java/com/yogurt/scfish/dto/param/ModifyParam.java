package com.yogurt.scfish.dto.param;

import com.yogurt.scfish.dto.base.InputConverter;
import com.yogurt.scfish.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ModifyParam implements InputConverter<User> {
  private String username;
  private String nickname;
}
