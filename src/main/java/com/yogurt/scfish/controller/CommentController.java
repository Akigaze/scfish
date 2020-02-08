package com.yogurt.scfish.controller;

import com.yogurt.scfish.dto.param.CommentParam;
import com.yogurt.scfish.entity.Comment;
import com.yogurt.scfish.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static com.yogurt.scfish.contstant.ScfishConstant.DEFAULT_PAGE_SIZE_OF_COMMENT;

@Controller
@RequestMapping("/scfish/comment")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CommentController {
  private CommentService commentService;

  @PostMapping
  public void publishComment(@RequestBody CommentParam commentParam) {
    this.commentService.addComment(commentParam);
//        this.commentService.changeUpdateTime(commentParam.getPostId());
  }

  @GetMapping
  public Page<Comment> getComments(
      @RequestParam @NonNull Integer postId,
      @RequestParam(defaultValue = "0") int pageNum,
      @RequestParam(defaultValue = DEFAULT_PAGE_SIZE_OF_COMMENT) int pageSize) {
    return this.commentService.getComments(postId, pageNum, pageSize);
  }

}