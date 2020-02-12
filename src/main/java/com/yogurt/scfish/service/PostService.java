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

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostService {

  private PostRepository postRepository;

  public void addPost(PostParam postParam) {
    Post post = postParam.convertTo();
    SecurityContext context = SecurityContextHolder.getContext();
    User user = context.getAuthorizedUser();
    post.setUser(user);
    postRepository.save(post);
  }

  public Page<PostDTO> convert(@NonNull Page<Post> pageOfPost){
    return pageOfPost.map(post -> {
      PostDTO postDTO = new PostDTO().convertFrom(post);
      postDTO.setUsername(post.getUser().getUsername());
      postDTO.setUserNickname(post.getUser().getNickname());
      return postDTO;
    });
  }

  public Page<PostDTO> getPosts(@NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    Page<Post> pageOfPost = postRepository.findAll(pageable);
    return convert(pageOfPost);
  }

  public void deletePost(Integer postId) {
    SecurityContext context = SecurityContextHolder.getContext();
    User user = context.getAuthorizedUser();
    if (postRepository.findByUserAndId(user, postId) != null) {
      this.postRepository.deleteById(postId);
    }
  }

  public Page<PostDTO> search(String keyword, @NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    Page<Post> pageOfPost=  postRepository.findAllByTitleLikeOrContentLike(keyword, keyword, pageable);
    return convert(pageOfPost);
  }

  public Page<PostDTO> getPostsByUsername(@NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    SecurityContext context = SecurityContextHolder.getContext();
    User user = context.getAuthorizedUser();
    Page<Post> pageOfPost = postRepository.findAllByUser(user,pageable);
    return convert(pageOfPost);
  }

}
