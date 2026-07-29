package com.farmerassistant.backend.service;

import com.farmerassistant.backend.model.FarmerProfile;
import com.farmerassistant.backend.model.User;
import com.farmerassistant.backend.repository.FarmerProfileRepository;
import com.farmerassistant.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Slf4j
@Service
public class FarmerProfileService {

    @Autowired
    private FarmerProfileRepository farmerProfileRepository;

    @Autowired
    private UserRepository userRepository;

    public FarmerProfile createProfile(Long userId, String state, String district,
                                       String village, String soilType, String irrigationType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        FarmerProfile profile = new FarmerProfile();
        profile.setUser(user);
        profile.setState(state);
        profile.setDistrict(district);
        profile.setVillage(village);
        profile.setSoilType(FarmerProfile.SoilType.valueOf(soilType.toUpperCase()));
        profile.setIrrigationType(FarmerProfile.IrrigationType.valueOf(irrigationType.toUpperCase()));

        return farmerProfileRepository.save(profile);
    }

    public FarmerProfile getProfileByUserId(Long userId) {
        return farmerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));
    }

    public FarmerProfile updateProfile(Long profileId, BigDecimal latitude, BigDecimal longitude,
                                       BigDecimal farmSize, BigDecimal soilPh) {
        FarmerProfile profile = farmerProfileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found!"));

        if (latitude != null) profile.setLatitude(latitude);
        if (longitude != null) profile.setLongitude(longitude);
        if (farmSize != null) profile.setFarmSizeHectares(farmSize);
        if (soilPh != null) profile.setSoilPh(soilPh);

        return farmerProfileRepository.save(profile);
    }
}

