package com.farmerassistant.backend.service;

import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import java.io.IOException;

@Service
public class OllamaService {

    private Process ollamaProcess;
    private static final String OLLAMA_EXECUTABLE = "ollama serve";

    @PostConstruct
    public void startOllama() {
        try {
            // ✅ CHECK IF OLLAMA IS ALREADY RUNNING
            if (isOllamaRunning()) {
                System.out.println("✅ Ollama is already running!");
                return;
            }

            // ✅ START OLLAMA IN BACKGROUND
            System.out.println("🤖 Starting Ollama service...");

            ProcessBuilder processBuilder = new ProcessBuilder("cmd", "/c", "ollama serve");
            processBuilder.redirectErrorStream(true);

            // ✅ REDIRECT OUTPUT TO LOG FILE (so you can see logs)
            ProcessBuilder.Redirect logFile = ProcessBuilder.Redirect.to(
                    new java.io.File("ollama.log")
            );
            processBuilder.redirectOutput(logFile);

            // ✅ START PROCESS
            ollamaProcess = processBuilder.start();

            System.out.println("✅ Ollama service started successfully!");
            System.out.println("📝 Logs saved to: ollama.log");

        } catch (IOException e) {
            System.err.println("❌ Error starting Ollama: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @PreDestroy
    public void stopOllama() {
        if (ollamaProcess != null && ollamaProcess.isAlive()) {
            System.out.println("🛑 Stopping Ollama service...");
            ollamaProcess.destroy();
            System.out.println("✅ Ollama service stopped");
        }
    }

    // ✅ CHECK IF OLLAMA IS RUNNING
    private boolean isOllamaRunning() {
        try {
            ProcessBuilder checkProcess = new ProcessBuilder("cmd", "/c", "netstat -ano | findstr :11434");
            Process process = checkProcess.start();

            java.io.BufferedReader reader = new java.io.BufferedReader(
                    new java.io.InputStreamReader(process.getInputStream())
            );

            String line = reader.readLine();
            reader.close();
            process.waitFor();

            return line != null && !line.isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    // ✅ GET OLLAMA STATUS
    public boolean getOllamaStatus() {
        return isOllamaRunning();
    }
}