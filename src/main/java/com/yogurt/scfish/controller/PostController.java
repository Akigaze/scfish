package com.yogurt.scfish.controller;

import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.param.PostParam;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.jws.WebParam;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/scfish/v1/post")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostController {

    private PostService postService;

    @PostMapping()
    public ModelAndView publish(HttpServletRequest request, @ModelAttribute PostParam postParam){
        HttpSession session = request.getSession();
        postParam.setUserId(session.getAttribute(SessionAttribute.USER_ID).toString());
        this.postService.addPost(postParam);
        return new ModelAndView("redirect:/");
    }

    @GetMapping("/getPosts")
    public ModelAndView getPosts(RedirectAttributes redirectAttributes) {
        Page<Post> postPage = this.postService.getPosts(0);
        ModelAndView modelAndView = new ModelAndView("/index");
        modelAndView.addObject("postPage",postPage);
        return modelAndView;
    }

    @GetMapping("/getNextPosts")
    public ModelAndView getNextPosts(@RequestParam Integer page,RedirectAttributes redirectAttributes){
        Page<Post> postPage = this.postService.getPosts(page);
        ModelAndView modelAndView = new ModelAndView("/index");
        modelAndView.addObject("postPage",postPage);
        return modelAndView;
    }

    @GetMapping("/deletePost")
    public String deletePost(HttpServletRequest request,@RequestParam Integer postId){
        User user = (User) request.getSession().getAttribute("user");
        String userId = user.getId();
        this.postService.deletePost(userId,postId);
        return "redirect:/";
    }

}

