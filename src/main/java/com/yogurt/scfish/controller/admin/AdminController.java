package com.yogurt.scfish.controller.admin;


import com.yogurt.scfish.dto.param.UserParam;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@Controller
@RequestMapping("/scfish/admin/v1")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AdminController {

  private AdminService adminService;

  @PostMapping("/login")
  public ModelAndView login(
      HttpServletRequest request,
      @RequestParam("id") String id,
      @RequestParam("password") String password) {
    if (adminService.validate(id, password)) {
      adminService.authorize(request, id);
      return new ModelAndView("redirect:/");
    }
    ModelAndView redirectView = new ModelAndView("redirect:/login");
    redirectView.addObject("message", "账号或密码错误");
    return redirectView;
  }

  @PostMapping(value = "/register")
  public ModelAndView register(
      @RequestParam("id") String id,
      @RequestParam("name") String name,
      @RequestParam("password") String password) {
    try {
      UserParam userParam = new UserParam(id, name, password, true);
      this.adminService.addUser(userParam);
      return new ModelAndView("redirect:/login");
    } catch (DuplicatedException e) {
      ModelAndView redirectView = new ModelAndView("redirect:/register");
      redirectView.addObject("message", "用户名已被注册");
      return redirectView;
    }
  }

  @GetMapping("/logout")
  public ModelAndView logout(HttpServletRequest request) {
    request.getSession(true).invalidate();
    return new ModelAndView("redirect:/login");
  }
}

