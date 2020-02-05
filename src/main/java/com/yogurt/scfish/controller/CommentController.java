package com.yogurt.scfish.controller;

import com.sun.org.apache.regexp.internal.RE;
import com.yogurt.scfish.contstant.SessionAttribute;
import com.yogurt.scfish.dto.param.CommentParam;
import com.yogurt.scfish.entity.Comment;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.service.CommentService;
import lombok.AllArgsConstructor;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/scfish/comment")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CommentController {
    private CommentService commentService;

    @PostMapping()
    public ModelAndView publicComment(@ModelAttribute CommentParam commentParam,HttpServletRequest request){
        this.commentService.addComment(commentParam);
        return getComments(commentParam.getPostId(),request);
    }

    @GetMapping("/get")
    public ModelAndView getComments(@RequestParam Integer postId,HttpServletRequest request){
        Page<Comment> page = this.commentService.getComments(postId,0);
        ModelAndView modelAndView = new ModelAndView("/postContent");
        modelAndView.addObject("commentPage",page);
        return modelAndView;
    }

}