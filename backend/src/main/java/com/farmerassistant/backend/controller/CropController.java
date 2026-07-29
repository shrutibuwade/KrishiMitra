package com.farmerassistant.backend.controller;

import com.farmerassistant.backend.model.Crop;
import com.farmerassistant.backend.service.CropService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/crops")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CropController {

    @Autowired
    private CropService cropService;

    @GetMapping
    public ResponseEntity<?> getAllCrops() {
        try {
            List<Crop> crops = cropService.getAllCrops();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Crops retrieved successfully");
            response.put("data", crops);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCropById(@PathVariable Long id) {
        try {
            Crop crop = cropService.getCropById(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", crop);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/season/{season}")
    public ResponseEntity<?> getCropsBySeason(@PathVariable String season) {
        try {
            List<Crop> crops = cropService.getCropsBySeason(season);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", crops);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> getRecommendedCrops(
            @RequestParam String soilType,
            @RequestParam Integer temperature,
            @RequestParam Integer rainfall) {
        try {
            List<Crop> crops = cropService.getRecommendedCrops(soilType, temperature, rainfall);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", crops);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}

