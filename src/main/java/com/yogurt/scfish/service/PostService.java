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

  public Page<PostDTO> getPosts(@NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    Page<Post> pageOfPost = postRepository.findAll(pageable);
    return pageOfPost.map(post -> {
      PostDTO postDTO = new PostDTO().convertFrom(post);
      postDTO.setUsername(post.getUser().getUsername());
      postDTO.setUserNickname(post.getUser().getNickname());
      return postDTO;
    });
  }

  public void deletePost(Integer postId) {
    SecurityContext context = SecurityContextHolder.getContext();
    User user = context.getAuthorizedUser();
    if (postRepository.findByUserAndId(user, postId) != null) {
      this.postRepository.deleteById(postId);
    }
  }

  public Page<Post> search(String keyword, @NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.DESC, "updatedTime"));
    return postRepository.findAllByTitleLikeOrContentLike(keyword, keyword, pageable);
  }

}
