package com.farmerassistant.backend.service;

import com.farmerassistant.backend.dto.PostDTO;
import com.farmerassistant.backend.dto.UserDTO;
import com.farmerassistant.backend.model.Post;
import com.farmerassistant.backend.model.PostLike;
import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.repository.PostRepository;
import com.farmerassistant.backend.repository.PostLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostLikeRepository postLikeRepository;

    // Create Post
    public PostDTO createPost(PostDTO postDTO, User user) {  // ✅ Change Post to PostDTO
        // Convert DTO to Post
        Post post = new Post();
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setProblemDescription(postDTO.getProblemDescription());
        post.setImageUrl(postDTO.getImageUrl());
        post.setVideoUrl(postDTO.getVideoUrl());
        post.setCropType(postDTO.getCropType());
        post.setState(postDTO.getState());
        post.setCategory(postDTO.getCategory());
        post.setUser(user);
        post.setLikesCount(0);
        post.setCommentsCount(0);

        Post savedPost = postRepository.save(post);
        return convertToDTO(savedPost, user);
    }

    // Get All Posts (Paginated)
    public Page<PostDTO> getAllPosts(Pageable pageable, User currentUser) {
        Page<Post> posts = postRepository.findByOrderByCreatedAtDesc(pageable);
        List<PostDTO> postDTOs = posts.getContent().stream()
                .map(post -> convertToDTO(post, currentUser))
                .collect(Collectors.toList());
        return new PageImpl<>(postDTOs, pageable, posts.getTotalElements());
    }

    // Get Posts by Crop Type
    public Page<PostDTO> getPostsByCropType(String cropType, Pageable pageable, User currentUser) {
        Page<Post> posts = postRepository.findByCropType(cropType, pageable);
        List<PostDTO> postDTOs = posts.getContent().stream()
                .map(post -> convertToDTO(post, currentUser))
                .collect(Collectors.toList());
        return new PageImpl<>(postDTOs, pageable, posts.getTotalElements());
    }

    // Get Posts by State
    public Page<PostDTO> getPostsByState(String state, Pageable pageable, User currentUser) {
        Page<Post> posts = postRepository.findByState(state, pageable);
        List<PostDTO> postDTOs = posts.getContent().stream()
                .map(post -> convertToDTO(post, currentUser))
                .collect(Collectors.toList());
        return new PageImpl<>(postDTOs, pageable, posts.getTotalElements());
    }

    // Get Posts by Category
    public Page<PostDTO> getPostsByCategory(String category, Pageable pageable, User currentUser) {
        Page<Post> posts = postRepository.findByCategory(category, pageable);
        List<PostDTO> postDTOs = posts.getContent().stream()
                .map(post -> convertToDTO(post, currentUser))
                .collect(Collectors.toList());
        return new PageImpl<>(postDTOs, pageable, posts.getTotalElements());
    }

    // Get Posts by Multiple Filters
    public Page<PostDTO> getPostsByFilters(String cropType, String state, String category, Pageable pageable, User currentUser) {
        Page<Post> posts = postRepository.findByCropTypeAndStateAndCategory(cropType, state, category, pageable);
        List<PostDTO> postDTOs = posts.getContent().stream()
                .map(post -> convertToDTO(post, currentUser))
                .collect(Collectors.toList());
        return new PageImpl<>(postDTOs, pageable, posts.getTotalElements());
    }

    // Search Posts
    public Page<PostDTO> searchPosts(String title, Pageable pageable, User currentUser) {
        Page<Post> posts = postRepository.findByTitleContainingIgnoreCase(title, pageable);
        List<PostDTO> postDTOs = posts.getContent().stream()
                .map(post -> convertToDTO(post, currentUser))
                .collect(Collectors.toList());
        return new PageImpl<>(postDTOs, pageable, posts.getTotalElements());
    }

    // Get Single Post
    public PostDTO getPostById(Long postId, User currentUser) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        return convertToDTO(post, currentUser);
    }

    // Update Post
    public PostDTO updatePost(Long postId, Post postDetails, User currentUser) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        post.setTitle(postDetails.getTitle());
        post.setContent(postDetails.getContent());
        post.setCropType(postDetails.getCropType());
        post.setState(postDetails.getState());
        post.setCategory(postDetails.getCategory());

        Post updatedPost = postRepository.save(post);
        return convertToDTO(updatedPost, currentUser);
    }

    // Delete Post
    public void deletePost(Long postId, User currentUser) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        if (!post.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        postRepository.deleteById(postId);
    }

    // Like Post
    public PostDTO likePost(Long postId, User currentUser) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

        PostLike existingLike = postLikeRepository.findByPostIdAndUserId(postId, currentUser.getId());

        if (existingLike == null) {
            PostLike like = new PostLike();
            like.setPost(post);
            like.setUser(currentUser);
            postLikeRepository.save(like);
            post.setLikesCount(post.getLikesCount() + 1);
        } else {
            postLikeRepository.deleteByPostIdAndUserId(postId, currentUser.getId());
            post.setLikesCount(Math.max(0, post.getLikesCount() - 1));
        }

        postRepository.save(post);
        return convertToDTO(post, currentUser);
    }

    // Helper method to convert Post to PostDTO
    public PostDTO convertToDTO(Post post, User currentUser) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setProblemDescription(post.getProblemDescription());
        dto.setImageUrl(post.getImageUrl());
        dto.setVideoUrl(post.getVideoUrl());
        dto.setCropType(post.getCropType());
        dto.setState(post.getState());
        dto.setCategory(post.getCategory());
        dto.setLikesCount(post.getLikesCount());
        dto.setCommentsCount(post.getCommentsCount());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());

        // ✅ CONVERT USER - MAKE SURE name AND username ARE SET
        if (post.getUser() != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(post.getUser().getId());
            userDTO.setName(post.getUser().getName());  // ✅ SET name
            userDTO.setUsername(post.getUser().getUsername());  // ✅ SET username
            userDTO.setEmail(post.getUser().getEmail());
            userDTO.setState(post.getUser().getState());

            // Count posts by this user
            long postsCount = postRepository.countByUserId(post.getUser().getId());
            userDTO.setPostsCount((Long) postsCount);

            dto.setUser(userDTO);

            System.out.println("DEBUG: Post User - Name: " + userDTO.getName() + ", Username: " + userDTO.getUsername());
        }

        // Check if liked by current user
        if (currentUser != null) {
            PostLike like = postLikeRepository.findByPostIdAndUserId(post.getId(), currentUser.getId());
            dto.setIsLikedByMe(like != null);
        } else {
            dto.setIsLikedByMe(false);
        }

        return dto;
    }
}