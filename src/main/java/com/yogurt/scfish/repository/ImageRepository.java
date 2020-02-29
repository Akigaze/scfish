package com.yogurt.scfish.repository;

import com.yogurt.scfish.entity.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ImageRepository extends JpaRepository<Image,Integer> {
  Page<Image> findAllByPostId(Integer postId,Pageable pageable);
  Optional<Image> findByPostIdAndPicIndex(Integer postId,Integer index);
}
