package com.yogurt.scfish.controller;

import com.yogurt.scfish.dto.param.PostParam;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/scfish/post")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostController {

  private PostService postService;

  @GetMapping
  public Page<Post> getAll(
      @RequestParam(defaultValue = "0") int pageNum,
      @RequestParam(defaultValue = "10") int pageSize) {
    return this.postService.getPosts(pageNum, pageSize);
  }

  @PostMapping
  public ResponseEntity<String> publish(@RequestBody @NonNull PostParam postParam) {
    this.postService.addPost(postParam);
    return ResponseEntity.accepted().body("Publish successfully");
  }

  @DeleteMapping
  public Page<Post> delete(@RequestParam @NonNull int postId) {
    this.postService.deletePost(postId);
    return getAll(0, 10);
  }

  @PostMapping("/search")
  public Page<Post> search(
      @RequestParam String keyword,
      @RequestParam(defaultValue = "0") int pageNum,
      @RequestParam(defaultValue = "10") int pageSize) {
    return this.postService.search("%" + keyword + "%", pageNum, pageSize);
  }
}

