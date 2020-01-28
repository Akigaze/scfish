package com.yogurt.scfish.dto;

import com.yogurt.scfish.entity.BaseEntity;
import com.yogurt.scfish.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
  private Integer id;
  private String userId;
  private String title;
  private String content;

  public Post convert() {
    Post post = new Post();
    BeanUtils.copyProperties(this, post);
    return post;
  }

}
