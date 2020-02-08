package com.yogurt.scfish.repository;

import com.yogurt.scfish.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Integer> {
  Comment findByUsernameAndId(String username, Integer commentId);

  Page<Comment> findAllByPostId(Integer postId, Pageable pageable);
}
