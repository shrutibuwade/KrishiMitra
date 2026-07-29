package com.farmerassistant.backend.controller;

import com.farmerassistant.backend.service.OllamaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ollama")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class OllamaController {

    @Autowired
    private OllamaService ollamaService;

    // ✅ CHECK IF OLLAMA IS RUNNING
    @GetMapping("/status")
    public ResponseEntity<?> getOllamaStatus() {
        try {
            boolean isRunning = ollamaService.getOllamaStatus();

            Map<String, Object> response = new HashMap<>();
            response.put("status", isRunning ? "running" : "offline");
            response.put("isRunning", isRunning);
            response.put("message", isRunning ? "Ollama is running" : "Ollama is not running");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }
}