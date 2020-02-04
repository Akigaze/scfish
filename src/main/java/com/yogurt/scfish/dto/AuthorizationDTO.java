package com.yogurt.scfish.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yogurt.scfish.dto.base.OutputConverter;
import com.yogurt.scfish.security.token.AuthToken;
import lombok.Data;

@Data
public class AuthorizationDTO implements OutputConverter<AuthorizationDTO, AuthToken> {
  private String accessToken;
  private long expiredTime;
  @JsonProperty("sessionToken")
  private String refreshToken;
  private UserDTO profile;
}
