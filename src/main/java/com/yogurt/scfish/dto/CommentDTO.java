package com.yogurt.scfish.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private String avatar;
    @JsonFormat(pattern="yyyy-MM-dd hh:mm:ss")
    private LocalDateTime createdTime;
}
