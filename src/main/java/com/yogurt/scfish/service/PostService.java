package com.yogurt.scfish.service;

import com.yogurt.scfish.dto.PostDTO;
import com.yogurt.scfish.dto.param.PostParam;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.repository.PostRepository;
import com.yogurt.scfish.security.context.SecurityContext;
import com.yogurt.scfish.security.context.SecurityContextHolder;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostService {

  private PostRepository postRepository;
  private FavoriteService favoriteService;
  private LikeService likeService;
  private ImageService imageService;

  public User getUser() {
    SecurityContext context = SecurityContextHolder.getContext();
    return context.getAuthorizedUser();
  }

  public void addPost(@NonNull PostParam postParam, MultipartFile[] files) throws IOException {
    Post post = postParam.convertTo();
    post.setUser(getUser());
    Post returnPost = postRepository.saveAndFlush(post);
    if(files!=null){
      int i = 0;
      for(MultipartFile file : files){
        imageService.saveImg(returnPost.getId(),i,file.getBytes());
        i++;
      }
    }
  }

  public Page<PostDTO> convert(@NonNull Page<Post> pageOfPost) {
    return pageOfPost.map(post -> {
      PostDTO postDTO = new PostDTO().convertFrom(post);
      postDTO.setUsername(post.getUser().getUsername());
      postDTO.setUserNickname(post.getUser().getNickname());
      postDTO.setIsFavorite(this.favoriteService.isFavorite(getUser().getUsername(), post));
      postDTO.setIsLike(likeService.isLike(getUser().getUsername(), post.getId()));
      postDTO.setLikeNum(likeService.getLikeNum(post.getId()));
      postDTO.setImgList(imageService.getImgs(post.getId()));
      return postDTO;
    });
  }

  public Page<PostDTO> getPosts(@NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    Page<Post> pageOfPost = postRepository.findAll(pageable);
    return convert(pageOfPost);
  }

  public void deletePost(Integer postId) {
    if (postRepository.findByUserAndId(getUser(), postId) != null) {
      this.postRepository.deleteById(postId);
    }
  }

  public Page<PostDTO> search(String keyword, @NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    Page<Post> pageOfPost = postRepository.findAllByTitleLikeOrContentLike(keyword, keyword, pageable);
    return convert(pageOfPost);
  }

  public Page<PostDTO> getPostsByUsername(@NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    Page<Post> pageOfPost = postRepository.findAllByUser(getUser(), pageable);
    return convert(pageOfPost);
  }

  public void addFavorite(Integer postId) {
    Optional<Post> post = this.postRepository.findById(postId);
    this.favoriteService.addFavorite(post.get(), getUser().getUsername());
  }

  public void removeFavorite(Integer postId) {
    Optional<Post> post = this.postRepository.findById(postId);
    this.favoriteService.removeFavorite(post.get(), getUser().getUsername());
  }

  public Page<PostDTO> getFavoritePosts(@NonNull Integer pageNum, @NonNull Integer pageSize) {
    return this.favoriteService.getFavoriteList(getUser().getUsername(), pageNum, pageSize).map(favorite -> {
      PostDTO postDTO = new PostDTO().convertFrom(favorite.getPost());
      postDTO.setUsername(favorite.getPost().getUser().getUsername());
      postDTO.setUserNickname(favorite.getPost().getUser().getNickname());
      postDTO.setIsFavorite(true);
      postDTO.setIsLike(likeService.isLike(getUser().getUsername(), favorite.getId()));
      postDTO.setLikeNum(likeService.getLikeNum(favorite.getId()));
      postDTO.setImgList(imageService.getImgs(favorite.getId()));
      return postDTO;
    });
  }

  public void addLike(@NonNull Integer postId) {
    likeService.addLike(getUser().getUsername(), postId);
  }

  public void removeLike(@NonNull Integer postId) {
    likeService.removeLike(getUser().getUsername(), postId);
  }

}
