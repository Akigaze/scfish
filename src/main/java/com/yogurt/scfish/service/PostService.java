package com.yogurt.scfish.service;

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
    post.setUsername(user.getUsername());
    postRepository.save(post);
  }

  public Page<Post> getPosts(@NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    return postRepository.findAll(pageable);
  }

  public void deletePost(Integer postId) {
    SecurityContext context = SecurityContextHolder.getContext();
    User user = context.getAuthorizedUser();
    if (postRepository.findByUsernameAndId(user.getUsername(), postId) != null) {
      this.postRepository.deleteById(postId);
    }
  }

  public Page<Post> search(String keyword, @NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    return postRepository.findAllByTitleLikeOrContentLike(keyword, keyword, pageable);
  }

}
