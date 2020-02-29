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
  private String avatarThumbnail;

  public void setAvatarThumbnail(byte[] avatarThumbnail) {
    BASE64Encoder encoder = new BASE64Encoder();
    this.avatarThumbnail = avatarThumbnail != null ? encoder.encode(avatarThumbnail) : "";
  }
}
