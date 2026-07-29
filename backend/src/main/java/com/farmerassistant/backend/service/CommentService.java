package com.farmerassistant.backend.service;

import com.farmerassistant.backend.dto.CommentDTO;
import com.farmerassistant.backend.dto.UserDTO;
import com.farmerassistant.backend.model.Comment;
import com.farmerassistant.backend.model.CommentLike;
import com.farmerassistant.backend.model.Post;
import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.repository.CommentRepository;
import com.farmerassistant.backend.repository.CommentLikeRepository;
import com.farmerassistant.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentLikeRepository commentLikeRepository;

    @Autowired
    private PostRepository postRepository;

    // Create Comment
    public CommentDTO createComment(Long postId, Comment comment, User user) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        comment.setPost(post);
        comment.setUser(user);
        comment.setLikesCount(0);
        Comment savedComment = commentRepository.save(comment);

        // Update post comments count
        post.setCommentsCount(post.getCommentsCount() + 1);
        postRepository.save(post);

        return convertToDTO(savedComment, null);
    }

    // Get Comments by Post (Paginated)
    public Page<CommentDTO> getCommentsByPost(Long postId, Pageable pageable, User currentUser) {
        Page<Comment> comments = commentRepository.findByPostIdOrderByCreatedAtDesc(postId, pageable);
        List<CommentDTO> commentDTOs = comments.getContent().stream()
                .map(comment -> convertToDTO(comment, currentUser))
                .collect(Collectors.toList());
        return new PageImpl<>(commentDTOs, pageable, comments.getTotalElements());
    }

    // Update Comment
    public CommentDTO updateComment(Long commentId, Comment commentDetails, User currentUser) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        comment.setContent(commentDetails.getContent());
        Comment updatedComment = commentRepository.save(comment);
        return convertToDTO(updatedComment, currentUser);
    }

    // Delete Comment
    public void deleteComment(Long commentId, User currentUser) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Post post = comment.getPost();
        post.setCommentsCount(Math.max(0, post.getCommentsCount() - 1));
        postRepository.save(post);

        commentRepository.deleteById(commentId);
    }

    // Like Comment
    public CommentDTO likeComment(Long commentId, User currentUser) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));

        CommentLike existingLike = commentLikeRepository.findByCommentIdAndUserId(commentId, currentUser.getId());

        if (existingLike == null) {
            CommentLike like = new CommentLike();
            like.setComment(comment);
            like.setUser(currentUser);
            commentLikeRepository.save(like);
            comment.setLikesCount(comment.getLikesCount() + 1);
        } else {
            commentLikeRepository.deleteByCommentIdAndUserId(commentId, currentUser.getId());
            comment.setLikesCount(Math.max(0, comment.getLikesCount() - 1));
        }

        commentRepository.save(comment);
        return convertToDTO(comment, currentUser);
    }

    // Helper method to convert Comment to CommentDTO
    private CommentDTO convertToDTO(Comment comment, User currentUser) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setPostId(comment.getPost().getId());
        dto.setLikesCount(comment.getLikesCount());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUpdatedAt(comment.getUpdatedAt());

        // Convert User
        UserDTO userDTO = new UserDTO();
        userDTO.setId(comment.getUser().getId());
        userDTO.setName(comment.getUser().getUsername());
        userDTO.setEmail(comment.getUser().getEmail());
        userDTO.setState(comment.getUser().getPassword());
        dto.setUser(userDTO);

        // Check if current user liked this comment
        if (currentUser != null) {
            CommentLike like = commentLikeRepository.findByCommentIdAndUserId(comment.getId(), currentUser.getId());
            dto.setIsLikedByMe(like != null);
        } else {
            dto.setIsLikedByMe(false);
        }

        return dto;
    }
}