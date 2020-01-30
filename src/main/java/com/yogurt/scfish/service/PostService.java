package com.yogurt.scfish.service;

import com.yogurt.scfish.dto.PostDTO;
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

  public void addPost(PostDTO postDTO) {
    Post post = postDTO.convert();
    postRepository.save(post);
  }

  public Page<Post> getPosts(int page){
    int size = 5;
    PageRequest pageRequest = PageRequest.of(page,size,
            new Sort(Sort.Direction.ASC,"updateTime"));
    return postRepository.findAll(pageRequest);
  }
}