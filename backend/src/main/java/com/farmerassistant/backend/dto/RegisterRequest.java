package com.farmerassistant.backend.dto;

public class RegisterRequest {
    private String username;
    private String name;  // ✅ ADD THIS
    private String email;
    private String password;
    private String state;  // ✅ ADD THIS
    private String fullName;
    private String phoneNumber;
    private String userType;

    public RegisterRequest() {}

    public RegisterRequest(String username, String name, String email, String password,
                           String state, String fullName, String phoneNumber, String userType) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.state = state;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.userType = userType;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }  // ✅ ADD THIS
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getState() { return state; }  // ✅ ADD THIS
    public void setState(String state) { this.state = state; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }
}