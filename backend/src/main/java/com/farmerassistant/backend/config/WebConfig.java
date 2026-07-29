package com.farmerassistant.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadDir = "file:///" + System.getProperty("user.home") + "/krishimitra_uploads/";
        System.out.println("Mapping uploads to: " + uploadDir);

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadDir);
    }
}