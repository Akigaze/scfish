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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/scfish/post")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostController {

    private PostService postService;

    @GetMapping("/getPosts")
    public ResponseEntity<Page> getPosts(@RequestParam Integer page) {
        Page<Post> postPage = this.postService.getPosts(page-1);
        if(postPage.isEmpty()){
            return new ResponseEntity(null,HttpStatus.ACCEPTED);
        }
        return new ResponseEntity(postPage,HttpStatus.ACCEPTED);
    }

    @PostMapping("/publish")
    public ResponseEntity publish(@ModelAttribute PostParam postParam){
        this.postService.addPost(postParam);
        return new ResponseEntity("Publish successfully",HttpStatus.ACCEPTED);
    }

    @GetMapping("/deletePost")
    public ResponseEntity deletePost(HttpServletRequest request,@RequestParam Integer postId){
        User user = (User) request.getSession().getAttribute("user");
        String username = user.getUsername();
        this.postService.deletePost(username, postId);
        return getPosts(PostAttribute.FIRST_PAGE);
    }

    @PostMapping("/search")
    public ResponseEntity search(@RequestParam String keyword,Integer page){
        keyword = "%" + keyword + "%";
        Page<Post> postPage = this.postService.Search(keyword,page-1);
        if(postPage.isEmpty()){
            return new ResponseEntity(null,HttpStatus.ACCEPTED);
        }
        return new ResponseEntity(postPage,HttpStatus.ACCEPTED);
    }
}

