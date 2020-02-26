package com.yogurt.scfish.service;

import com.yogurt.scfish.entity.Like;
import com.yogurt.scfish.repository.LikeRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class LikeService {
  private LikeRepository likeRepository;

  public void addLike(@NonNull String username,@NonNull Integer postId){
    Like like = new Like();
    like.setPostId(postId);
    like.setUsername(username);
    likeRepository.save(like);
  }

  public void removeLike(@NonNull String username,@NonNull Integer postId){
    Optional<Like> like = likeRepository.findByUsernameAndPostId(username,postId);
    like.ifPresent(value -> likeRepository.delete(value));
  }

  public Boolean isLike(@NonNull String username,@NonNull Integer postId){
    return likeRepository.findByUsernameAndPostId(username,postId).isPresent();
  }

  public Integer getLikeNum(@NonNull Integer postId){
    return likeRepository.countByPostId(postId);
  }

}
