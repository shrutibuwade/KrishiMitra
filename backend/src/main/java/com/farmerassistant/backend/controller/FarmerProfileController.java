package com.farmerassistant.backend.controller;

import com.farmerassistant.backend.model.FarmerProfile;
import com.farmerassistant.backend.service.FarmerProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class FarmerProfileController {

    @Autowired
    private FarmerProfileService farmerProfileService;

    @PostMapping
    public ResponseEntity<?> createProfile(
            @RequestParam Long userId,
            @RequestParam String state,
            @RequestParam String district,
            @RequestParam String village,
            @RequestParam String soilType,
            @RequestParam String irrigationType) {
        try {
            FarmerProfile profile = farmerProfileService.createProfile(userId, state, district, village, soilType, irrigationType);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", profile);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        try {
            FarmerProfile profile = farmerProfileService.getProfileByUserId(userId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", profile);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestParam(required = false) BigDecimal latitude,
            @RequestParam(required = false) BigDecimal longitude,
            @RequestParam(required = false) BigDecimal farmSize,
            @RequestParam(required = false) BigDecimal soilPh) {
        try {
            FarmerProfile profile = farmerProfileService.updateProfile(id, latitude, longitude, farmSize, soilPh);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", profile);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}

