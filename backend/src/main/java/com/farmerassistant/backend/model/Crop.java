package com.farmerassistant.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "crops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @Column(length = 100)
    private String hindiName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CropType cropType = CropType.CEREAL;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Season season = Season.KHARIF;

    @Column(length = 100)
    private String idealSoilType;

    @Column
    private Integer minTemperature;

    @Column
    private Integer maxTemperature;

    @Column
    private Integer minRainfall;

    @Column
    private Integer maxRainfall;

    @Column
    private Integer growingPeriodDays;

    @Column(precision = 6, scale = 2)
    private BigDecimal yieldPerHectareQuintals;

    @Column(length = 255)
    private String imageUrl;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum CropType {
        CEREAL, PULSES, OILSEEDS, CASH_CROP, SPICES, VEGETABLES, FRUITS
    }

    public enum Season {
        KHARIF, RABI, SUMMER, PERENNIAL
    }
}
