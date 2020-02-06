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

import static com.yogurt.scfish.contstant.PostAttribute.COMMENT_SIZE;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CommentService{
    private CommentRepository commentRepository;

    public void addComment(CommentParam commentParam){
        Comment comment = commentParam.convertTo();
        this.commentRepository.save(comment);
    }

    public void changeUpdateTime(Integer postId){
//        this.commentRepository.changeUpdateTime(postId,postId);
    }

    public Page<Comment> getComments(Integer postId,Integer page) {
        Pageable pageable = PageRequest.of(page, COMMENT_SIZE, new Sort(Sort.Direction.ASC, "creationTime"));
        return commentRepository.findAllByPostId(postId,pageable);
    }

    public void deleteComment(String userId,Integer commentId){
        if(commentRepository.findByUsernameAndId(userId,commentId)!=null){
            this.commentRepository.deleteById(commentId);
        }
    }

}
