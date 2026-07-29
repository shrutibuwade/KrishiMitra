package com.farmerassistant.backend.dto;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String state;
    private Long postsCount;
    private Long commentsCount;
    private String username;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUsername() { return username; }  // ✅ ADD THIS
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public Long getPostsCount() { return postsCount; }
    public void setPostsCount(Long postsCount) { this.postsCount = postsCount; }

    public Long getCommentsCount() { return commentsCount; }
    public void setCommentsCount(Long commentsCount) { this.commentsCount = commentsCount; }
}