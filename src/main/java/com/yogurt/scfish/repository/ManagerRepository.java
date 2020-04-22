package com.yogurt.scfish.repository;

import com.yogurt.scfish.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ManagerRepository extends JpaRepository<Manager,Integer> {
  Optional<Manager> findByUsername(String username);
}
