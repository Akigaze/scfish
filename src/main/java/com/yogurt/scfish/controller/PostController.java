package com.yogurt.scfish.controller;

import com.yogurt.scfish.contstant.PostAttribute;
import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.param.PostParam;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.service.PostService;
import com.yogurt.scfish.util.JsonUtil;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.io.IOException;

@Controller
@RequestMapping("/scfish/v1/post")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostController {

    private PostService postService;

    @GetMapping("/getPosts")
    public ResponseEntity getPosts(@RequestParam Integer page) {
        Page<Post> postPage = this.postService.getPosts(page-1);
        if(postPage.isEmpty()){
            return ResponseEntity.badRequest().body("No more");
        }
        return ResponseEntity.accepted().body(postPage);

    }

    @PostMapping()
    public ResponseEntity publish(HttpServletRequest request, @ModelAttribute PostParam postParam){
        HttpSession session = request.getSession();
        postParam.setUsername(session.getAttribute(SessionAttribute.USER_NAME).toString());
        this.postService.addPost(postParam);
        return getPosts(PostAttribute.FIRST_PAGE);
    }

    @GetMapping("/deletePost")
    public ResponseEntity deletePost(HttpServletRequest request,@RequestParam Integer postId){
        User user = (User) request.getSession().getAttribute("user");
        String username = user.getUsername();
        this.postService.deletePost(username, postId);
        return getPosts(PostAttribute.FIRST_PAGE);
    }

    @GetMapping("/enterPost")
    public ModelAndView clickPost(@RequestParam Integer postId,HttpServletRequest request){
        ModelAndView modelAndView = new ModelAndView("redirect:/scfish/v1/comment/get?postId="+postId);
        request.getSession().setAttribute("post",this.postService.getPost(postId));
        return modelAndView;
    }
}

