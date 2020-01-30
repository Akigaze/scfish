package com.yogurt.scfish.controller.admin;


import com.yogurt.scfish.dto.param.UserParam;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@Controller
@RequestMapping("/scfish/admin/v1")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AdminController {

  private AdminService adminService;

  @PostMapping("/login")
  public String login(
          HttpServletRequest request,
          @RequestParam("id") String id,
          @RequestParam("password") String password,
          RedirectAttributes redirectAttributes) {
    if (adminService.validate(id, password)) {
      adminService.authorize(request, id);
      return "redirect:/scfish/v1/post/getPosts";
    }
   redirectAttributes.addFlashAttribute("message", "账号或密码错误");
    return "redirect:/login";
  }

  @PostMapping(value = "/register")
  public String register(
      @RequestParam("id") String id,
      @RequestParam("name") String name,
      @RequestParam("password") String password,
      RedirectAttributes redirectAttributes) {
    try {
      UserParam userParam = new UserParam(id, name, password, true);
      this.adminService.addUser(userParam);
      return "redirect:/login";
    } catch (DuplicatedException e) {
      redirectAttributes.addFlashAttribute("message", "用户名已被注册");
      return "redirect:/register";
    }
  }

  @GetMapping("/logout")
  public ModelAndView logout(HttpServletRequest request) {
    request.getSession(true).invalidate();
    return new ModelAndView("redirect:/login");
  }
}

