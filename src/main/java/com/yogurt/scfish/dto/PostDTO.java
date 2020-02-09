package com.yogurt.scfish.dto;

import com.yogurt.scfish.dto.base.OutputConverter;
import com.yogurt.scfish.entity.Post;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostDTO implements OutputConverter<PostDTO, Post> {
  private Integer id;
  private String title;
  private String content;
  private String username;
  private String userNickname;
  private LocalDateTime createdTime;
}
