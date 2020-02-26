package com.yogurt.scfish.repository;

import com.yogurt.scfish.entity.Comment;
import com.yogurt.scfish.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CommentRepository extends JpaRepository<Comment, Integer> {
  void deleteById(Integer commentId);
  Optional<Comment> findByUserAndId(User user, Integer commentId);
  Page<Comment> findAllByPostId(Integer postId, Pageable pageable);
}
