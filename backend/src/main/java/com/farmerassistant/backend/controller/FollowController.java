package com.farmerassistant.backend.controller;

import com.farmerassistant.backend.model.Follow;
import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.repository.FollowRepository;
import com.farmerassistant.backend.service.FollowService;
import com.farmerassistant.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/community/follow")
@CrossOrigin(origins = "http://localhost:5173")
public class FollowController {

    @Autowired
    private FollowService followService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FollowRepository followRepository;

    // Follow user
    @PostMapping("/{userId}")
    public ResponseEntity<?> followUser(
            @PathVariable Long userId,
            Authentication authentication) {
        try {
            User currentUser = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // ✅ PREVENT SELF-FOLLOW
            if (currentUser.getId().equals(userId)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You cannot follow yourself");
                return ResponseEntity.badRequest().body(error);
            }

            User userToFollow = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if already following
            if (followRepository.existsByFollowerAndFollowing(currentUser, userToFollow)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Already following this user");
                return ResponseEntity.badRequest().body(error);
            }

            // Create follow
            Follow follow = new Follow();
            follow.setFollower(currentUser);
            follow.setFollowing(userToFollow);
            follow.setCreatedAt(LocalDateTime.now());
            followRepository.save(follow);

            // Build response
            Map<String, Object> response = new HashMap<>();
            response.put("isFollowing", true);
            response.put("followersCount", followRepository.countByFollowing(userToFollow));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    // Unfollow user
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> unfollowUser(
            @PathVariable Long userId,
            Authentication authentication) {

        try {
            if (authentication == null) {
                return ResponseEntity.status(401).build();
            }

            User currentUser = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            followService.unfollowUser(currentUser.getId(), userId);

            Map<String, Object> response = new HashMap<>();
            response.put("isFollowing", false);
            response.put("followersCount", followService.getFollowerCount(userId));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Map.of("error", e.getMessage())
            );
        }
    }

    // Check if following
    @GetMapping("/check/{userId}")
    public ResponseEntity<Map<String, Object>> checkFollowing(
            @PathVariable Long userId,
            Authentication authentication) {

        try {
            if (authentication == null) {
                return ResponseEntity.status(401).build();
            }

            User currentUser = userRepository.findByEmail(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean isFollowing = followService.isFollowing(currentUser.getId(), userId);
            Long followersCount = followService.getFollowerCount(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("isFollowing", isFollowing);
            response.put("followersCount", followersCount);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Map.of("error", e.getMessage())
            );
        }
    }

    // Get follower count
    @GetMapping("/count/{userId}")
    public ResponseEntity<?> getFollowerCount(
            @PathVariable Long userId) {

        try {
            Map<String, Long> response = new HashMap<>();
            response.put("followers", followService.getFollowerCount(userId));
            response.put("following", followService.getFollowingCount(userId));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);  // ✅ FIX
        }
    }
}