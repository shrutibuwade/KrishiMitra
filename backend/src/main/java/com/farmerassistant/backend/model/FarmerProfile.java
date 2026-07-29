package com.farmerassistant.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "farmer_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FarmerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(length = 100)
    private String taluka;

    @Column(nullable = false, length = 100)
    private String village;

    @Column(precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(precision = 11, scale = 8)
    private BigDecimal longitude;

    @Column(precision = 8, scale = 2)
    private BigDecimal farmSizeHectares;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SoilType soilType = SoilType.UNKNOWN;

    @Column(precision = 3, scale = 1)
    private BigDecimal soilPh;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IrrigationType irrigationType = IrrigationType.RAIN_FED;

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

    public enum SoilType {
        LOAMY, SANDY, CLAYEY, SILTY, UNKNOWN
    }

    public enum IrrigationType {
        RAIN_FED, WELL, CANAL, DRIP, SPRINKLER
    }
}

