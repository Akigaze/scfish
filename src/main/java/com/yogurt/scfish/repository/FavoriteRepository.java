package com.yogurt.scfish.repository;

import com.yogurt.scfish.entity.Favorite;
import com.yogurt.scfish.entity.Post;
import com.yogurt.scfish.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite,Integer> {
  Optional<Favorite> findByUsernameAndPost(String username, Post post);
  Page<Favorite> findAllByUsername(String username, Pageable pageable);
}
