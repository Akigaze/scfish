package com.yogurt.scfish.controller.admin;

import com.yogurt.scfish.dto.UserDTO;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.security.context.SecurityContext;
import com.yogurt.scfish.security.context.SecurityContextHolder;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scfish/user")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

  @GetMapping("/profile")
  public UserDTO getProfile() {
    SecurityContext context = SecurityContextHolder.getContext();
    User user = context.getAuthorization().getUserDetail().getUser();
    return new UserDTO().convertFrom(user);
  }
}

