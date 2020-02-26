package com.yogurt.scfish.dto;

import com.yogurt.scfish.dto.base.OutputConverter;
import com.yogurt.scfish.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sun.misc.BASE64Encoder;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO implements OutputConverter<UserDTO, User> {
  private String username;
  private String nickname;
  private String avatar;

  public void setAvatar(byte[] avatar) {
    BASE64Encoder encoder = new BASE64Encoder();
    this.avatar = avatar != null ? encoder.encode(avatar) : "";
  }
}
