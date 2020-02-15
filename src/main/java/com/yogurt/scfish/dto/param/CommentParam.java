package com.yogurt.scfish.dto.param;

import com.yogurt.scfish.dto.base.InputConverter;
import com.yogurt.scfish.entity.Comment;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CommentParam implements InputConverter<Comment> {
  private Integer postId;
  private String content;
}
