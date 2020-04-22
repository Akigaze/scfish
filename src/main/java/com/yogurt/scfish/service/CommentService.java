package com.yogurt.scfish.service;

import com.yogurt.scfish.dto.CommentDTO;
import com.yogurt.scfish.dto.param.CommentParam;
import com.yogurt.scfish.entity.Comment;
import com.yogurt.scfish.entity.User;
import com.yogurt.scfish.repository.CommentRepository;
import com.yogurt.scfish.security.context.SecurityContext;
import com.yogurt.scfish.security.context.SecurityContextHolder;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CommentService {
  private CommentRepository commentRepository;

  public User getUser() {
    SecurityContext context = SecurityContextHolder.getContext();
    return context.getAuthorizedUser();
  }

  public void addComment(@NonNull CommentParam commentParam) {
    Comment comment = commentParam.convertTo();
    comment.setUser(getUser());
    this.commentRepository.save(comment);
  }

  public Page<CommentDTO> getComments(@NonNull int postId, @NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.ASC, "createdTime"));
    Page<Comment> commentPage = commentRepository.findAllByPostId(postId, pageable);
    return commentPage.map(comment -> {
      CommentDTO commentDTO = new CommentDTO().convertFrom(comment);
      commentDTO.setUserNickname(comment.getUser().getNickname());
      commentDTO.setUsername(comment.getUser().getUsername());

      byte[] avatar = comment.getUser().getAvatarThumbnail();
      BASE64Encoder encoder = new BASE64Encoder();
      commentDTO.setAvatar(avatar != null ? encoder.encode(avatar) : "");
      return commentDTO;
    });
  }

  public void deleteComment(@NonNull Integer commentId) {
    commentRepository.findByUserAndId(getUser(), commentId).ifPresent(value -> {
      commentRepository.delete(value);
    });
  }

  public void deleteComments(@NonNull Integer postId) {
    commentRepository.findAllByPostId(postId, null).map(value -> {
      commentRepository.delete(value);
      return null;
    });
  }
}
