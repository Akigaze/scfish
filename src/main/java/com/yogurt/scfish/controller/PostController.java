package com.yogurt.scfish.controller;

import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.PostDTO;
import com.yogurt.scfish.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/scfish/v1/post")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostController {

  private PostService postService;

  @PostMapping()
  public ModelAndView publish(HttpServletRequest request, @ModelAttribute PostDTO postDTO) {
    HttpSession session = request.getSession();
    postDTO.setUserId(session.getAttribute(SessionAttribute.USER_ID).toString());
    this.postService.addPost(postDTO);
    return new ModelAndView("redirect:/");
  }
}
