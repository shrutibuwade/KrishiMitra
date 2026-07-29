package com.farmerassistant.backend.controller;

import com.farmerassistant.backend.dto.CommentDTO;
import com.farmerassistant.backend.model.Comment;
import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.service.CommentService;
import com.farmerassistant.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community/comments")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserRepository userRepository;

    // Create Comment
    @PostMapping("/post/{postId}")
    public ResponseEntity<CommentDTO> createComment(
            @PathVariable Long postId,
            @RequestBody Comment comment,
            Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(401).build();
        }

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        CommentDTO createdComment = commentService.createComment(postId, comment, user);
        return ResponseEntity.ok(createdComment);
    }

    // Get Comments by Post
    @GetMapping("/post/{postId}")
    public ResponseEntity<Page<CommentDTO>> getCommentsByPost(
            @PathVariable Long postId,
            Pageable pageable,
            Authentication authentication) {
        User user = authentication != null ? userRepository.findByEmail(authentication.getName()).orElse(null) : null;
        Page<CommentDTO> comments = commentService.getCommentsByPost(postId, pageable, user);
        return ResponseEntity.ok(comments);
    }

    // Update Comment
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(
            @PathVariable Long commentId,
            @RequestBody Comment commentDetails,
            Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        CommentDTO updatedComment = commentService.updateComment(commentId, commentDetails, user);
        return ResponseEntity.ok(updatedComment);
    }

    // Delete Comment
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        commentService.deleteComment(commentId, user);
        return ResponseEntity.ok().build();
    }

    // Like Comment
    @PostMapping("/{commentId}/like")
    public ResponseEntity<CommentDTO> likeComment(@PathVariable Long commentId, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        CommentDTO comment = commentService.likeComment(commentId, user);
        return ResponseEntity.ok(comment);
    }
}