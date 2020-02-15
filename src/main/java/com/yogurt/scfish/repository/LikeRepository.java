package com.yogurt.scfish.repository;


import com.yogurt.scfish.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like,Integer> {
  Integer countByPostId(Integer postId);
  Optional<Like> findByUsernameAndPostId(String username,Integer postId);
}
