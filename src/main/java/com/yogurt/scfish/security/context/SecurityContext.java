package com.yogurt.scfish.security.context;


import lombok.Data;

@Data
public class SecurityContext {

  private Authorization authorization;

  public boolean isAuthorized() {
    return authorization != null;
  }

}
