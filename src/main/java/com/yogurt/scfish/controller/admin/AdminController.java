package com.yogurt.scfish.controller.admin;


import com.yogurt.scfish.dto.param.LoginParam;
import com.yogurt.scfish.dto.param.RegisterParam;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.security.token.AuthToken;
import com.yogurt.scfish.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/scfish/admin/v1")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AdminController {

  private AdminService adminService;

  @PostMapping("/login")
  public AuthToken login(@RequestBody @NonNull LoginParam loginParam) {
    return adminService.authorize(loginParam);
  }

  @PostMapping("/refresh/{refreshToken}")
  public AuthToken refresh(@PathVariable @NonNull String refreshToken) {
    return adminService.refreshToken(refreshToken);
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(
          @RequestBody @NonNull RegisterParam registerParam) {
    try {
      this.adminService.addUser(registerParam);
      return ResponseEntity.ok().body("registered successfully");
    } catch (DuplicatedException e) {
      return ResponseEntity.badRequest().body("This username has been registered");
    }
  }

  @GetMapping("/logout")
  public ModelAndView logout(HttpServletRequest request) {
    request.getSession(true).invalidate();
    return new ModelAndView("redirect:/login");
  }
}

