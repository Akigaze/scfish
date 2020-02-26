package com.yogurt.scfish.controller;

import com.yogurt.scfish.dto.PostDTO;
import com.yogurt.scfish.dto.param.PostParam;
import com.yogurt.scfish.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

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

  @PostMapping("/publish")
  public void publish(@ModelAttribute PostParam postParam, @RequestParam("files") @Nullable MultipartFile[] files) throws IOException {
    this.postService.addPost(postParam, files);
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
    return this.postService.search("%" + keyword + "%", pageNum, pageSize);
  }

  @GetMapping("/addFavorite")
  public void addFavorite(@RequestParam Integer postId) {
    this.postService.addFavorite(postId);
  }

  @GetMapping("/removeFavorite")
  public void removeFavorite(@RequestParam Integer postId) {
    this.postService.removeFavorite(postId);
  }

  @GetMapping("/getMyFavorite")
  public Page<PostDTO> getMyFavoritePosts(
          @RequestParam @NonNull Integer pageNum,
          @RequestParam @NonNull Integer pageSize) {
    return this.postService.getFavoritePosts(pageNum, pageSize);
  }

  @GetMapping("/addLike")
  public void addLike(@RequestParam Integer postId) {
    this.postService.addLike(postId);
  }

  @GetMapping("/removeLike")
  public void removeLike(@RequestParam Integer postId) {
    this.postService.removeLike(postId);
  }


}

