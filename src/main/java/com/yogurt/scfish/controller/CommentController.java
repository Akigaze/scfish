package com.yogurt.scfish.controller;

import com.yogurt.scfish.dto.CommentDTO;
import com.yogurt.scfish.dto.param.CommentParam;
import com.yogurt.scfish.entity.Comment;
import com.yogurt.scfish.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/scfish/comment")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CommentController {
  private CommentService commentService;

  @PostMapping
  public void publishComment(@RequestBody CommentParam commentParam) {
    this.commentService.addComment(commentParam);
  }

  @GetMapping
  public Page<CommentDTO> getComments(
          @RequestParam @NonNull Integer postId,
          @RequestParam(defaultValue = "0") int pageNum,
          @RequestParam(defaultValue = "10") int pageSize) {
    return this.commentService.getComments(postId, pageNum, pageSize);
  }

}