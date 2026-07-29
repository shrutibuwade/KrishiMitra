package com.farmerassistant.backend.controller;

import com.farmerassistant.backend.dto.PostDTO;
import com.farmerassistant.backend.model.Post;
import com.farmerassistant.backend.model.PostLike;
import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.repository.PostLikeRepository;
import com.farmerassistant.backend.repository.PostRepository;
import com.farmerassistant.backend.repository.UserRepository;
import com.farmerassistant.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/community/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostLikeRepository postLikeRepository;

    // ========== FILE UPLOAD ==========
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "type", required = false) String type) {

        System.out.println("Upload endpoint called");
        System.out.println("File: " + (file != null ? file.getOriginalFilename() : "null"));

        try {
            if (file == null || file.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "File is empty");
                return ResponseEntity.badRequest().body(error);
            }

            // ✅ Use absolute path - create uploads in user's home directory
            String uploadDir = System.getProperty("user.home") + "/krishimitra_uploads/";
            System.out.println("Upload directory: " + uploadDir);

            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                System.out.println("Created directory: " + uploadDir);
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            System.out.println("Saving file to: " + filePath);
            Files.write(filePath, file.getBytes());

            Map<String, String> response = new HashMap<>();
            response.put("url", "/uploads/" + fileName);
            response.put("message", "File uploaded successfully");

            System.out.println("Upload successful: " + fileName);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Upload error: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // ========== CREATE POST ==========
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostDTO postDTO, Authentication authentication) {
        try {
            User currentUser = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // postService.createPost already returns PostDTO
            PostDTO responseDTO = postService.createPost(postDTO, currentUser);  // ✅ Direct assignment

            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(400).body(error);
        }
    }

    // ========== GET ALL POSTS ==========
    @GetMapping
    public ResponseEntity<?> getAllPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        try {
            User currentUser;
            if (authentication != null) {
                currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
            } else {
                currentUser = null;
            }

            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Post> posts = postRepository.findByOrderByCreatedAtDesc(pageable);

            Page<PostDTO> postDTOs = posts.map(post -> postService.convertToDTO(post, currentUser));

            return ResponseEntity.ok(postDTOs);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // ========== GET MY POSTS ==========
    @GetMapping("/my-posts")
    public ResponseEntity<?> getMyPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        try {
            User currentUser = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Post> posts = postRepository.findByUser(currentUser, pageable);

            return ResponseEntity.ok(
                    posts.map(post -> postService.convertToDTO(post, currentUser))
            );
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(401).body(error);
        }
    }

    // ========== GET BY CROP TYPE ==========
    @GetMapping("/crop/{cropType}")
    public ResponseEntity<?> getPostsByCropType(
            @PathVariable String cropType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        try {
            User currentUser;
            if (authentication != null) {
                currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
            } else {
                currentUser = null;
            }

            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Post> posts = postRepository.findByCropType(cropType, pageable);

            Page<PostDTO> postDTOs = posts.map(post -> postService.convertToDTO(post, currentUser));

            return ResponseEntity.ok(postDTOs);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // ========== GET BY STATE ==========
    @GetMapping("/state/{state}")
    public ResponseEntity<?> getPostsByState(
            @PathVariable String state,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        try {
            User currentUser;
            if (authentication != null) {
                currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
            } else {
                currentUser = null;
            }

            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Post> posts = postRepository.findByState(state, pageable);

            Page<PostDTO> postDTOs = posts.map(post -> postService.convertToDTO(post, currentUser));

            return ResponseEntity.ok(postDTOs);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // ========== GET BY CATEGORY ==========
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getPostsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        try {
            User currentUser;
            if (authentication != null) {
                currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
            } else {
                currentUser = null;
            }

            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Post> posts = postRepository.findByCategory(category, pageable);

            Page<PostDTO> postDTOs = posts.map(post -> postService.convertToDTO(post, currentUser));

            return ResponseEntity.ok(postDTOs);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // ========== SEARCH POSTS ==========
    @GetMapping("/search")
    public ResponseEntity<?> searchPosts(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {

        try {
            User currentUser;
            if (authentication != null) {
                currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
            } else {
                currentUser = null;
            }

            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<Post> posts = postRepository.findByTitleContainingIgnoreCase(title, pageable);

            Page<PostDTO> postDTOs = posts.map(post -> postService.convertToDTO(post, currentUser));

            return ResponseEntity.ok(postDTOs);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // ========== GET POST BY ID ==========
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = null;
            if (authentication != null) {
                currentUser = userRepository.findByEmail(authentication.getName()).orElse(null);
            }

            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            PostDTO postDTO = postService.convertToDTO(post, currentUser);

            return ResponseEntity.ok(postDTO);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(404).body(error);
        }
    }

    // ========== UPDATE POST ==========
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody PostDTO postDTO, Authentication authentication) {
        try {
            User currentUser = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            if (!post.getUser().getId().equals(currentUser.getId())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Unauthorized");
                return ResponseEntity.status(403).body(error);
            }

            post.setTitle(postDTO.getTitle());
            post.setContent(postDTO.getContent());
            post.setProblemDescription(postDTO.getProblemDescription());
            post.setCropType(postDTO.getCropType());
            post.setState(postDTO.getState());
            post.setCategory(postDTO.getCategory());

            Post updatedPost = postRepository.save(post);

            return ResponseEntity.ok(postService.convertToDTO(updatedPost, currentUser));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(400).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(
            @PathVariable Long id,
            Authentication authentication) {
        try {
            // ✅ GET CURRENT USER FROM JWT
            User currentUser = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // ✅ GET POST
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            // ✅ CHECK OWNERSHIP BY USER ID
            if (!post.getUser().getId().equals(currentUser.getId())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You can only delete your own posts");
                return ResponseEntity.status(403).body(error);
            }

            // ✅ DELETE POST
            postRepository.deleteById(id);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Post deleted successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }


    // ========== LIKE POST ==========
    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable Long id, Authentication authentication) {
        try {
            User currentUser = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Post not found"));

            PostLike like = postLikeRepository.findByPostIdAndUserId(id, currentUser.getId());

            if (like != null) {
                postLikeRepository.delete(like);
                post.setLikesCount(Math.max(0, post.getLikesCount() - 1));
            } else {
                like = new PostLike();
                like.setPost(post);
                like.setUser(currentUser);
                postLikeRepository.save(like);
                post.setLikesCount(post.getLikesCount() + 1);
            }

            postRepository.save(post);

            return ResponseEntity.ok(postService.convertToDTO(post, currentUser));
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(400).body(error);
        }
    }
}