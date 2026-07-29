package com.farmerassistant.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import com.farmerassistant.backend.entity.State;
import com.farmerassistant.backend.entity.District;
import com.farmerassistant.backend.repository.StateRepository;
import com.farmerassistant.backend.repository.DistrictRepository;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private DistrictRepository districtRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void loadDataFromCSV() {
        try {
            // Check if data already exists
            long stateCount = stateRepository.count();

            if (stateCount > 0) {
                logger.info("✅ States and districts already loaded. Skipping CSV import.");
                logger.info("📊 Database has {} states and {} districts",
                        stateCount, districtRepository.count());
                return;
            }

            logger.info("🔄 Loading states and districts from CSV...");
            importCSVData();
            logger.info("✅ Data import completed successfully!");

        } catch (Exception e) {
            logger.error("❌ Error loading CSV data:", e);
            e.printStackTrace();
        }
    }

    private void importCSVData() throws Exception {
        InputStream inputStream = getClass()
                .getClassLoader()
                .getResourceAsStream("states_districts.csv");

        if (inputStream == null) {
            throw new RuntimeException(
                    "❌ CSV file not found! Place 'states_districts.csv' in 'src/main/resources/' folder"
            );
        }

        InputStreamReader reader = new InputStreamReader(inputStream);
        CSVParser csvParser = new CSVParser(reader,
                CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreEmptyLines());

        Map<String, State> stateMap = new HashMap<>();
        int districtCount = 0;
        int stateCount = 0;

        logger.info("📊 Processing CSV records...");

        for (CSVRecord record : csvParser) {
            try {
                String stateName = record.get("state_name").trim();
                String stateCode = record.get("state_code").trim();
                String region = record.get("region").trim();
                String districtName = record.get("district_name").trim();
                String districtCode = record.get("district_code").trim();

                // Skip empty rows
                if (stateName.isEmpty() || districtName.isEmpty()) {
                    continue;
                }

                // Get or create state
                State state = stateMap.get(stateName);
                if (state == null) {
                    state = new State(stateName, stateCode, region);
                    state = stateRepository.save(state);
                    stateMap.put(stateName, state);
                    stateCount++;
                    logger.info("✅ Created state: {} ({})", stateName, stateCount);
                }

                // Create district
                District district = new District(state, districtName, districtCode);
                districtRepository.save(district);
                districtCount++;

                // Log progress
                if (districtCount % 50 == 0) {
                    logger.info("📊 Processed {} districts...", districtCount);
                }

            } catch (Exception e) {
                logger.warn("⚠️ Error processing row: {}", e.getMessage());
            }
        }

        csvParser.close();
        reader.close();
        inputStream.close();

        logger.info("✅ CSV Import Complete!");
        logger.info("📊 Total states: {}", stateCount);
        logger.info("📊 Total districts: {}", districtCount);
    }
}
