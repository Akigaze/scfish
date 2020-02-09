package com.yogurt.scfish.dto;

import com.yogurt.scfish.dto.base.OutputConverter;
import com.yogurt.scfish.entity.Comment;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDTO implements OutputConverter<CommentDTO, Comment> {
    private Integer id;
    private Integer postId;
    private String username;
    private String userNickname;
    private String content;
    private LocalDateTime createdTime;
}
