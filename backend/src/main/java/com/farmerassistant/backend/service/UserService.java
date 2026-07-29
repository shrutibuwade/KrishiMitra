package com.farmerassistant.backend.service;

import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Get all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Get user by ID - Returns User (not Optional)
     */
    public User findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    /**
     * Get user by ID - Alternative method
     */
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    /**
     * Get user by email
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    /**
     * Check if user exists by email
     */
    public boolean userExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    /**
     * Register a new user
     */
    public User registerUser(String username, String name, String email, String password,
                             String state, String fullName, String phoneNumber, String userType) {

        System.out.println("=== REGISTERING USER ===");
        System.out.println("Username: " + username);
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("State: " + state);

        User user = new User();
        user.setUsername(username != null ? username : email);
        user.setName(name != null ? name : username);  // ✅ SET name - REQUIRED
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setState(state != null ? state : "Unknown");  // ✅ SET state - REQUIRED
        user.setFullName(fullName != null ? fullName : name);
        user.setPhoneNumber(phoneNumber != null ? phoneNumber : "9999999999");
        user.setUserType(userType != null ? userType : "FARMER");
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        System.out.println("User name: " + user.getName());
        System.out.println("User state: " + user.getState());

        User savedUser = userRepository.save(user);

        System.out.println("User saved successfully with ID: " + savedUser.getId());

        return savedUser;
    }

    /**
     * Save or update user
     */
    public User saveUser(User user) {
        if (user.getId() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    /**
     * Update user by ID
     */
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            if (userDetails.getFullName() != null) {
                user.setFullName(userDetails.getFullName());
            }
            if (userDetails.getPhoneNumber() != null) {
                user.setPhoneNumber(userDetails.getPhoneNumber());
            }
            if (userDetails.getUsername() != null) {
                user.setUsername(userDetails.getUsername());
            }
            user.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(user);
        }
        return null;
    }

    /**
     * Delete user by ID
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Activate user
     */
    public User activateUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setActive(true);
            user.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(user);
        }
        return null;
    }

    /**
     * Deactivate user
     */
    public User deactivateUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setActive(false);
            user.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(user);
        }
        return null;
    }

    /**
     * Get user by username
     */
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    /**
     * Check if username exists
     */
    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    /**
     * Count total users
     */
    public long countAllUsers() {
        return userRepository.count();
    }
}