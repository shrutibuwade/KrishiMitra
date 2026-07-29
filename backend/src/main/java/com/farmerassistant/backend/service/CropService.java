package com.farmerassistant.backend.service;

import com.farmerassistant.backend.model.Crop;
import com.farmerassistant.backend.repository.CropRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CropService {

    @Autowired
    private CropRepository cropRepository;

    public List<Crop> getAllCrops() {
        return cropRepository.findAll();
    }

    public Crop getCropById(Long id) {
        return cropRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crop not found!"));
    }

    public List<Crop> getCropsBySeason(String season) {
        try {
            Crop.Season seasonEnum = Crop.Season.valueOf(season.toUpperCase());
            return cropRepository.findBySeason(seasonEnum);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid season: " + season);
        }
    }

    public List<Crop> getCropsByType(String cropType) {
        try {
            Crop.CropType typeEnum = Crop.CropType.valueOf(cropType.toUpperCase());
            return cropRepository.findByCropType(typeEnum);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid crop type: " + cropType);
        }
    }

    public List<Crop> getRecommendedCrops(String soilType, Integer temperature, Integer rainfall) {
        List<Crop> allCrops = cropRepository.findAll();

        // For now, just return first 5 crops to test if API works
        return allCrops.stream()
                .limit(5)
                .collect(Collectors.toList());
    }


    private boolean matchesSoilType(Crop crop, String soilType) {
        return crop.getIdealSoilType() == null ||
                crop.getIdealSoilType().toLowerCase().contains(soilType.toLowerCase());
    }

    private boolean matchesTemperature(Crop crop, Integer temperature) {
        return (crop.getMinTemperature() == null || temperature >= crop.getMinTemperature()) &&
                (crop.getMaxTemperature() == null || temperature <= crop.getMaxTemperature());
    }

    private boolean matchesRainfall(Crop crop, Integer rainfall) {
        return (crop.getMinRainfall() == null || rainfall >= crop.getMinRainfall()) &&
                (crop.getMaxRainfall() == null || rainfall <= crop.getMaxRainfall());
    }
}

