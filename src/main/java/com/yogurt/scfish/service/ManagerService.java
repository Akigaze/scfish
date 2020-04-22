package com.yogurt.scfish.service;

import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.repository.ManagerRepository;
import com.yogurt.scfish.security.context.SecurityContext;
import com.yogurt.scfish.security.context.SecurityContextHolder;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ManagerService {
  private ManagerRepository managerRepository;

  public String getContextUsername(){
    SecurityContext securityContext = SecurityContextHolder.getContext();
    User user = securityContext.getAuthorizedUser();
    return user.getUsername();
  }

  public Boolean isManager() {
    return this.managerRepository.findByUsername(getContextUsername()).isPresent();
  }
}
