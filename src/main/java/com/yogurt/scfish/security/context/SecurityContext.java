package com.yogurt.scfish.security.context;


import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.exception.AuthorizationException;
import com.yogurt.scfish.security.authorization.Authorization;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SecurityContext {

  private Authorization authorization;

  public boolean isAuthorized() {
    return authorization != null;
  }

  public User getAuthorizedUser(){
    if (!this.isAuthorized()){
      throw new AuthorizationException("You has not logged in. Please login first.");
    }
    return this.authorization.getUserDetail().getUser();
  }

}
