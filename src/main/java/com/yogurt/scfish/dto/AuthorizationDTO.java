package com.yogurt.scfish.dto;

import com.yogurt.scfish.dto.base.OutputConverter;
import com.yogurt.scfish.security.AuthToken;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class AuthorizationDTO implements OutputConverter<AuthorizationDTO, AuthToken> {
  private String sessionToken;
  private String accessToken;
  private long expiredTime;
  private UserDTO profile;
}
