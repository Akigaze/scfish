package com.yogurt.scfish.controller;

import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.param.PostParam;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/scfish/v1/post")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostController {

    private PostService postService;

    @GetMapping("/getPosts")
    public ResponseEntity<Page> getPosts() {
        Page<Post> postPage = this.postService.getPosts(0);
        return ResponseEntity.accepted().body(postPage);
    }

    @GetMapping("/getNextPosts")
    public ResponseEntity<Page> getNextPosts(@RequestParam Integer page){
        Page<Post> postPage = this.postService.getPosts(page);
        return ResponseEntity.accepted().body(postPage);
    }

    @PostMapping()
    public ResponseEntity<Page> publish(HttpServletRequest request, @ModelAttribute PostParam postParam){
        HttpSession session = request.getSession();
        postParam.setUsername(session.getAttribute(SessionAttribute.USER_NAME).toString());
        this.postService.addPost(postParam);
        return getPosts();
    }

    @GetMapping("/deletePost")
    public ResponseEntity<Page> deletePost(HttpServletRequest request,@RequestParam Integer postId){
        User user = (User) request.getSession().getAttribute("user");
        String username = user.getUsername();
        this.postService.deletePost(username, postId);
        return getPosts();
    }

    @GetMapping("/enterPost")
    public ModelAndView clickPost(@RequestParam Integer postId,HttpServletRequest request){
        ModelAndView modelAndView = new ModelAndView("redirect:/scfish/v1/comment/get?postId="+postId);
        request.getSession().setAttribute("post",this.postService.getPost(postId));
        return modelAndView;
    }
}

