package com.yogurt.scfish.controller.admin;

import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.UserDTO;
import com.yogurt.scfish.exception.DuplicatedException;
import com.yogurt.scfish.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
      HttpSession session = request.getSession(true);
      session.setAttribute(SessionAttribute.USER_TOKEN, id);
      session.setAttribute(SessionAttribute.USER_ID, id);
      return "redirect:/scfish/v1/post/get?page=1";
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
      UserDTO userDTO = new UserDTO(id, name, password, true);
      this.adminService.addUser(userDTO);
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

