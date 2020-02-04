package com.yogurt.scfish.security.context;


import com.yogurt.scfish.security.authorization.Authorization;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SecurityContext {

  private Authorization authorization;

  public boolean isAuthorized() {
    return authorization != null;
  }

}
