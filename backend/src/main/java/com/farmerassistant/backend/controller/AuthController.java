package com.farmerassistant.backend.controller;

import com.farmerassistant.backend.dto.LoginRequest;
import com.farmerassistant.backend.dto.LoginResponse;
import com.farmerassistant.backend.dto.RegisterRequest;
import com.farmerassistant.backend.dto.ApiResponse;
import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.security.JwtTokenProvider;
import com.farmerassistant.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"})
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Register new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            // Validate input
            if (registerRequest.getUsername() == null || registerRequest.getUsername().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse(false, "Username is required", null)
                );
            }

            if (registerRequest.getEmail() == null || registerRequest.getEmail().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse(false, "Email is required", null)
                );
            }

            if (registerRequest.getPassword() == null || registerRequest.getPassword().length() < 6) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse(false, "Password must be at least 6 characters", null)
                );
            }

            // Check if user already exists
            if (userService.userExists(registerRequest.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(
                        new ApiResponse(false, "Email already registered", null)
                );
            }

            // Register user
            User newUser = userService.registerUser(
                    registerRequest.getUsername(),
                    registerRequest.getName(),
                    registerRequest.getEmail(),
                    registerRequest.getPassword(),
                    registerRequest.getState(),
                    registerRequest.getFullName(),
                    registerRequest.getPhoneNumber(),
                    registerRequest.getUserType()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ApiResponse(true, "User registered successfully", newUser)
            );

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Registration failed: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Login user (WITHOUT AuthenticationManager)
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            // Validate input
            if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse(false, "Email is required", null)
                );
            }

            if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ApiResponse(false, "Password is required", null)
                );
            }

            // Find user by email
            User user = userService.getUserByEmail(loginRequest.getEmail());
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse(false, "Invalid email or password", null)
                );
            }

            // Check if user is active
            if (!user.isActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        new ApiResponse(false, "User account is deactivated", null)
                );
            }

            // Verify password (compare with stored hash)
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse(false, "Invalid email or password", null)
                );
            }

            // Generate JWT token
            String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());

            // Create response
            LoginResponse loginResponse = new LoginResponse(
                    true,
                    "Login successful",
                    token,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getFullName(),
                    user.getUserType()
            );

            return ResponseEntity.ok(
                    new ApiResponse(true, "Login successful", loginResponse)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ApiResponse(false, "Login failed: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Get current user profile (from JWT token)
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse(false, "Missing or invalid token", null)
                );
            }

            // Extract token
            String jwtToken = token.substring(7);

            // Validate token
            if (!jwtTokenProvider.validateToken(jwtToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse(false, "Invalid or expired token", null)
                );
            }

            // Get user from token
            Long userId = jwtTokenProvider.getUserIdFromToken(jwtToken);
            User user = userService.getUserById(userId);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(false, "User not found", null)
                );
            }

            return ResponseEntity.ok(
                    new ApiResponse(true, "User found", user)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse(false, "Error: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Refresh JWT token
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse(false, "Missing or invalid token", null)
                );
            }

            // Extract token
            String jwtToken = token.substring(7);

            // Validate token
            if (!jwtTokenProvider.validateToken(jwtToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ApiResponse(false, "Invalid or expired token", null)
                );
            }

            // Get user from token
            Long userId = jwtTokenProvider.getUserIdFromToken(jwtToken);
            String email = jwtTokenProvider.getEmailFromToken(jwtToken);
            User user = userService.getUserById(userId);

            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ApiResponse(false, "User not found", null)
                );
            }

            // Generate new token
            String newToken = jwtTokenProvider.generateToken(userId, email);

            LoginResponse loginResponse = new LoginResponse(
                    true,
                    "Token refreshed",
                    newToken,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getFullName(),
                    user.getUserType()
            );

            return ResponseEntity.ok(
                    new ApiResponse(true, "Token refreshed", loginResponse)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ApiResponse(false, "Error: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Logout user (client-side: delete token)
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            // Just return success - client will delete token
            return ResponseEntity.ok(
                    new ApiResponse(true, "Logged out successfully", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Logout failed: " + e.getMessage(), null)
            );
        }
    }

    /**
     * Check if email exists
     */
    @GetMapping("/check-email/{email}")
    public ResponseEntity<?> checkEmailExists(@PathVariable String email) {
        try {
            boolean exists = userService.userExists(email);

            Map<String, Object> response = new HashMap<>();
            response.put("email", email);
            response.put("exists", exists);

            return ResponseEntity.ok(
                    new ApiResponse(true, exists ? "Email already registered" : "Email available", response)
            );

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ApiResponse(false, "Check failed: " + e.getMessage(), null)
            );
        }
    }
}