package com.yogurt.scfish.repository;

import com.yogurt.scfish.entity.Comment;
import com.yogurt.scfish.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Integer> {
  void deleteById(Integer commentId);
  Comment findByUserAndId(User user, Integer commentId);
  Page<Comment> findAllByPostId(Integer postId, Pageable pageable);
}
