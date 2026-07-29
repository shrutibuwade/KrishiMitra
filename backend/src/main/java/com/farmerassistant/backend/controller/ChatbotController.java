package com.farmerassistant.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatbotController {

    @Value("${ollama.api.url:http://127.0.0.1:11434}")
    private String ollamaApiUrl;

    @Value("${ollama.model:mistral}")
    private String ollamaModel;

    @Value("${ollama.timeout:120000}")
    private long ollamaTimeout;

    @Autowired
    private RestTemplate restTemplate;


    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/ask")
    public ChatbotResponse askChatbot(@RequestBody ChatbotRequest request) {
        System.out.println("=== CHATBOT REQUEST ===");
        System.out.println("Question: " + request.getQuestion());
        System.out.println("Language: " + request.getLanguage());

        try {
            String question = request.getQuestion();
            String language = request.getLanguage();

            // Check Ollama connection first
            System.out.println("Checking Ollama connection...");
            checkOllamaConnection();
            System.out.println("✅ Ollama is running!");

            // Build prompt
            String prompt = "You are a helpful farming expert. Answer briefly: " + question;
            System.out.println("Prompt: " + prompt);

            // Call Ollama
            System.out.println("Calling Ollama API...");
            String answer = callOllama(prompt);
            System.out.println("✅ Got answer: " + answer);

            return new ChatbotResponse(true, answer, language);

        } catch (Exception e) {
            System.out.println("❌ ERROR: " + e.getMessage());
            e.printStackTrace();
            return new ChatbotResponse(false, "Error: Ollama not responding. Make sure 'ollama serve' is running!", "en");
        }
    }

    private void checkOllamaConnection() throws Exception {
        String testPrompt = "test";
        String requestBody = "{\"model\":\"mistral\",\"prompt\":\"" + testPrompt + "\",\"stream\":false}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        try {
            String response = restTemplate.postForObject("http://localhost:11434/api/generate", entity, String.class);
            if (response == null) {
                throw new Exception("Ollama returned null response");
            }
        } catch (Exception e) {
            throw new Exception("Cannot connect to Ollama at localhost:11434. Make sure 'ollama serve' is running!", e);
        }
    }

    private String callOllama(String prompt) throws Exception {
        String requestBody = "{\"model\":\"mistral\",\"prompt\":\"" +
                prompt.replace("\"", "\\\"").replace("\n", "\\n") +
                "\",\"stream\":false}";

        System.out.println("Request: " + requestBody);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        String response = restTemplate.postForObject("http://localhost:11434/api/generate", entity, String.class);

        System.out.println("Response: " + response);

        JsonNode node = objectMapper.readTree(response);
        String answer = node.get("response").asText().trim();

        return answer;
    }
}

class ChatbotRequest {
    private String question;
    private String language;

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}

class ChatbotResponse {
    private boolean success;
    private String message;
    private String language;

    public ChatbotResponse(boolean success, String message, String language) {
        this.success = success;
        this.message = message;
        this.language = language;
    }

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public String getLanguage() { return language; }
}