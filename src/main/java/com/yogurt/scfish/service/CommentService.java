package com.yogurt.scfish.service;

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

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CommentService {
  private CommentRepository commentRepository;

  public void addComment(@NonNull CommentParam commentParam) {
    Comment comment = commentParam.convertTo();
    SecurityContext context = SecurityContextHolder.getContext();
    User user = context.getAuthorizedUser();
    comment.setUsername(user.getUsername());
    this.commentRepository.save(comment);
  }

  public Page<Comment> getComments(@NonNull int postId, @NonNull int pageNum, @NonNull int pageSize) {
    Pageable pageable = PageRequest.of(pageNum, pageSize, new Sort(Sort.Direction.ASC, "creationTime"));
    return commentRepository.findAllByPostId(postId, pageable);
  }

  public void deleteComment(@NonNull String username, @NonNull Integer commentId) {
    if (commentRepository.findByUsernameAndId(username, commentId) != null) {
      this.commentRepository.deleteById(commentId);
    }
  }

}
