package com.yogurt.scfish.controller.admin;


import com.yogurt.scfish.dto.param.LoginParam;
import com.yogurt.scfish.dto.param.RegisterParam;
import com.yogurt.scfish.security.token.AuthToken;
import com.yogurt.scfish.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/scfish/admin")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AdminController {

  private AdminService adminService;

  // TODO 处理重复登录
  @PostMapping("/login")
  public AuthToken login(@RequestBody @NonNull LoginParam loginParam) {
    return adminService.authorize(loginParam);
  }

  @PostMapping("/refresh/{refreshToken}")
  public AuthToken refresh(@PathVariable @NonNull String refreshToken) {
    return adminService.refreshToken(refreshToken);
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody @NonNull RegisterParam registerParam) {
    this.adminService.addUser(registerParam);
    return ResponseEntity.accepted().body("Register successfully");
  }

  @PostMapping("/logout")
  public void logout() {
    adminService.clearToken();
  }
}

