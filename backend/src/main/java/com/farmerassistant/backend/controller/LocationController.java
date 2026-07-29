package com.farmerassistant.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.farmerassistant.backend.repository.StateRepository;
import com.farmerassistant.backend.repository.DistrictRepository;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "http://localhost:5173")  // ← CHANGE THIS!
public class LocationController {

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private DistrictRepository districtRepository;

    // ... rest of the code stays the same
    /**
     * GET all states
     * GET http://localhost:8080/api/locations/states
     */
    @GetMapping("/states")
    public ApiResponse<List<String>> getAllStates() {
        try {
            List<String> states = stateRepository.findAll()
                    .stream()
                    .map(state -> state.getStateName())
                    .sorted()
                    .collect(Collectors.toList());

            return new ApiResponse<>(true, "Success", states);
        } catch (Exception e) {
            return new ApiResponse<>(false, e.getMessage(), null);
        }
    }

    /**
     * GET districts for a state
     * GET http://localhost:8080/api/locations/districts/Haryana
     */
    @GetMapping("/districts/{stateName}")
    public ApiResponse<List<String>> getDistrictsByState(@PathVariable String stateName) {
        try {
            var stateOpt = stateRepository.findByStateName(stateName);

            if (stateOpt.isEmpty()) {
                return new ApiResponse<>(false, "State not found", null);
            }

            List<String> districts = districtRepository
                    .findByStateId(stateOpt.get().getId())
                    .stream()
                    .map(district -> district.getDistrictName())
                    .sorted()
                    .collect(Collectors.toList());

            return new ApiResponse<>(true, "Success", districts);
        } catch (Exception e) {
            return new ApiResponse<>(false, e.getMessage(), null);
        }
    }

    /**
     * Health check
     */
    @GetMapping("/health")
    public ApiResponse<String> health() {
        long states = stateRepository.count();
        long districts = districtRepository.count();
        String message = String.format("Database has %d states and %d districts", states, districts);
        return new ApiResponse<>(true, message, "OK");
    }
}

/**
 * Generic API Response wrapper
 */
class ApiResponse<T> {
    public boolean success;
    public String message;
    public T data;

    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
