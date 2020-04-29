package com.yogurt.scfish.repository;

import com.yogurt.scfish.entity.Forbidden;
import com.yogurt.scfish.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForbiddenRepository extends JpaRepository<Forbidden,Integer> {
  Optional<Forbidden> findTopByUserOrderByCreatedTimeDesc(User user);
}
