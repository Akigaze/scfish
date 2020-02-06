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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/publish")
    public ResponseEntity publishComment(@ModelAttribute CommentParam commentParam){
        this.commentService.addComment(commentParam);
//        this.commentService.changeUpdateTime(commentParam.getPostId());
        return null;
    }

    @GetMapping("/getComments")
    public ResponseEntity getComments(@RequestParam Integer postId,Integer page){
        Page<Comment> commentPage = this.commentService.getComments(postId,page-1);
        return new ResponseEntity(commentPage,HttpStatus.ACCEPTED);
    }

}