package com.yogurt.scfish.service;

import com.yogurt.scfish.dto.param.PostParam;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class PostService {

  private PostRepository postRepository;

  public void addPost(PostParam postParam) {
    Post post = postParam.convertTo();
    postRepository.save(post);
  }

  public Post getPost(Integer postId){
    return postRepository.findById(postId).get();
  }

  public Page<Post> getPosts(Integer page) {
    int size = 5;
    Pageable pageable = PageRequest.of(page, size, new Sort(Sort.Direction.DESC, "updatedTime"));
    return postRepository.findAll(pageable);
  }

  public void deletePost(String userId,Integer postId){
    if(postRepository.findByUserIdAndId(userId,postId)!=null){
      this.postRepository.deleteById(postId);
    }
  }
}
