package com.yogurt.scfish.controller;

import com.yogurt.scfish.dto.PostDTO;
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
  public Page<PostDTO> getAll(
      @RequestParam(defaultValue = "0") int pageNum,
      @RequestParam(defaultValue = "10") int pageSize) {
    return this.postService.getPosts(pageNum, pageSize);
  }

    @GetMapping("/getMyPosts")
    public Page<PostDTO> getMyPosts(
            @RequestParam(defaultValue = "0") int pageNum,
            @RequestParam(defaultValue = "10") int pageSize) {
        return this.postService.getPostsByUsername(pageNum, pageSize);
    }

  @PostMapping
  public ResponseEntity<String> publish(@RequestBody @NonNull PostParam postParam) {
    this.postService.addPost(postParam);
    return ResponseEntity.accepted().body("Publish successfully");
  }

  @DeleteMapping
  public void delete(@RequestParam @NonNull int postId) {
    this.postService.deletePost(postId);
  }

  @PostMapping("/search")
  public Page<PostDTO> search(
      @RequestParam String keyword,
      @RequestParam(defaultValue = "0") int pageNum,
      @RequestParam(defaultValue = "10") int pageSize) {
      System.out.println(keyword);
    return this.postService.search("%" + keyword + "%", pageNum, pageSize);
  }
}

