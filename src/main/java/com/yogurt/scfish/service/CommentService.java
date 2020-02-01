package com.yogurt.scfish.service;

import com.yogurt.scfish.dto.param.CommentParam;
import com.yogurt.scfish.entity.Comment;
import com.yogurt.scfish.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CommentService{
    private CommentRepository commentRepository;

    public void addComment(CommentParam commentParam){
        Comment comment = commentParam.convertTo();
        this.commentRepository.save(comment);
    }

    public Page<Comment> getComments(Integer postId,Integer page) {
        int size = 5;
        Pageable pageable = PageRequest.of(page, size, new Sort(Sort.Direction.ASC, "creationTime"));
        return commentRepository.findAllByPostId(postId,pageable);
    }

    public void deleteComment(String userId,Integer commentId){
        if(commentRepository.findByUserIdAndId(userId,commentId)!=null){
            this.commentRepository.deleteById(commentId);
        }
    }

}
