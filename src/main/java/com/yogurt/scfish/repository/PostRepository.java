package com.yogurt.scfish.repository;

import com.yogurt.scfish.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    void deleteById(Integer id);
    Post findByUsernameAndId(String username, Integer postId);
    Page<Post> findAllByTitleLikeOrContentLike(String title, String content, Pageable pageable);
}
