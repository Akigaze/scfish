package com.yogurt.scfish.repository;

import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
  Post findByUserAndId(User user, Integer postId);
  Page<Post> findAllByUser(User user,Pageable pageable);
  Page<Post> findAllByTitleLikeOrContentLike(String title, String content, Pageable pageable);
}
