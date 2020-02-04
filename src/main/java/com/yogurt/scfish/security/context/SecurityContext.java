package com.yogurt.scfish.security.context;


import com.yogurt.scfish.security.authorization.Authorization;
import lombok.Data;

@Data
public class SecurityContext {

  private Authorization authorization;

  public boolean isAuthorized() {
    return authorization != null;
  }

}
