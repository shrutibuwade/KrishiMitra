package com.farmerassistant.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class KrishiMitraApplication {

	public static void main(String[] args) {
		SpringApplication.run(KrishiMitraApplication.class, args);
	}

	/**
	 * CORS Configuration
	 * Note: PasswordEncoder is now in SecurityConfig.java
	 */
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins(
								"http://localhost:5173",
								"http://localhost:5174",
								"http://localhost:3000",
								"http://127.0.0.1:5173",
								"http://127.0.0.1:5174",
								"http://127.0.0.1:3000"
						)
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true)
						.maxAge(3600);
			}
		};
	}
}
