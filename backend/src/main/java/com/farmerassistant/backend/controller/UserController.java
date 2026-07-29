package com.farmerassistant.backend.controller;

import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.service.UserService;
import com.farmerassistant.backend.dto.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Get all users
     */
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(
                    new ApiResponse(true, "Users fetched successfully", users)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Error fetching users: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Get user by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(false, "User not found", null)
                );
            }
            return ResponseEntity.ok(
                    new ApiResponse(true, "User fetched successfully", user)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Error fetching user: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Update user profile
     * Expects: { "fullName": "...", "phoneNumber": "..." }
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody Map<String, String> updateRequest) {
        try {
            User user = userService.getUserById(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(false, "User not found", null)
                );
            }

            // Update fields from request
            if (updateRequest.containsKey("fullName") && updateRequest.get("fullName") != null) {
                user.setFullName(updateRequest.get("fullName"));
            }
            if (updateRequest.containsKey("phoneNumber") && updateRequest.get("phoneNumber") != null) {
                user.setPhoneNumber(updateRequest.get("phoneNumber"));
            }
            if (updateRequest.containsKey("username") && updateRequest.get("username") != null) {
                user.setUsername(updateRequest.get("username"));
            }

            User updatedUser = userService.saveUser(user);

            return ResponseEntity.ok(
                    new ApiResponse(true, "User updated successfully", updatedUser)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Error updating user: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Delete user
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(false, "User not found", null)
                );
            }

            userService.deleteUser(id);

            return ResponseEntity.ok(
                    new ApiResponse(true, "User deleted successfully", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Error deleting user: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Activate user
     */
    @PostMapping("/{id}/activate")
    public ResponseEntity<?> activateUser(@PathVariable Long id) {
        try {
            User user = userService.activateUser(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(false, "User not found", null)
                );
            }

            return ResponseEntity.ok(
                    new ApiResponse(true, "User activated successfully", user)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Error activating user: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Deactivate user
     */
    @PostMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
        try {
            User user = userService.deactivateUser(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(false, "User not found", null)
                );
            }

            return ResponseEntity.ok(
                    new ApiResponse(true, "User deactivated successfully", user)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Error deactivating user: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Get total user count
     */
    @GetMapping("/stats/count")
    public ResponseEntity<?> getUserCount() {
        try {
            long count = userService.countAllUsers();
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalUsers", count);

            return ResponseEntity.ok(
                    new ApiResponse(true, "User count fetched", stats)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Error fetching count: " + e.getMessage(), null)
            );
        }
    }
}
