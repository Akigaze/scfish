package com.yogurt.scfish.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthorizationDTO {
  private String token;
  private UserDTO profile;
}
