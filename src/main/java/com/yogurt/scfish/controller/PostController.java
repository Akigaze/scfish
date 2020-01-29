package com.yogurt.scfish.controller;

import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.PostDTO;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
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

  @GetMapping("/get")
  public String getPosts(@RequestParam(value = "page") String page,
                         RedirectAttributes redirectAttributes){
    Page<Post> postPage = this.postService.getPosts(Integer.valueOf(page));
    redirectAttributes.addFlashAttribute("postPage",postPage);
    return "redirect:/index";
  }

}

