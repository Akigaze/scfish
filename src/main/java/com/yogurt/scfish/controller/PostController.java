package com.yogurt.scfish.controller;

import com.yogurt.scfish.dto.param.PostParam;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static com.yogurt.scfish.contstant.ScfishConstant.DEFAULT_PAGE_SIZE_OF_POST;

@Controller
@RequestMapping("/scfish/post")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostController {

  private PostService postService;

  @GetMapping
  public Page<Post> getAll(
      @RequestParam(defaultValue = "0") int pageNum,
      @RequestParam(defaultValue = DEFAULT_PAGE_SIZE_OF_POST) int pageSize) {
    return this.postService.getPosts(pageNum, pageSize);
  }

  @PostMapping
  public ResponseEntity<String> publish(@RequestBody @NonNull PostParam postParam) {
    this.postService.addPost(postParam);
    return ResponseEntity.accepted().body("Publish successfully");
  }

  @GetMapping
  public Page<Post> delete(@RequestParam @NonNull int postId) {
    this.postService.deletePost(postId);
    return getAll(0, Integer.parseInt(DEFAULT_PAGE_SIZE_OF_POST));
  }

  @PostMapping("/search")
  public Page<Post> search(
      @RequestParam String keyword,
      @RequestParam(defaultValue = "0") int pageNum,
      @RequestParam(defaultValue = DEFAULT_PAGE_SIZE_OF_POST) int pageSize) {
    return this.postService.search("%" + keyword + "%", pageNum, pageSize);
  }
}

