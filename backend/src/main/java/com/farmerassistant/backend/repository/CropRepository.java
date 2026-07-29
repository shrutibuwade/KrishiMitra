package com.farmerassistant.backend.repository;

import com.farmerassistant.backend.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findBySeason(Crop.Season season);
    List<Crop> findByCropType(Crop.CropType cropType);
    List<Crop> findByIdealSoilTypeContainingIgnoreCase(String soilType);
}
