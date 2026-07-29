package com.farmerassistant.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AgmarknetRealService {

    private static final Logger logger = LoggerFactory.getLogger(AgmarknetRealService.class);

    @Autowired
    private RestTemplate restTemplate;

    // Real Agmarknet API endpoints
    // API 1: Agmarknet official API
    private static final String AGMARKNET_API_V1 = "https://agmarknet.gov.in/SearchCMMU.aspx";

    // API 2: Alternative mandi prices API
    private static final String MANDI_API = "https://api.data.gov.in/resource/9ef84268-d588-465a-a5c0-3b405fcc2f6f";

    // API 3: Commodity prices API
    private static final String COMMODITY_API = "https://api.data.gov.in/resource/1d7b6005-b0b8-4715-aa39-a49910255308";

    private ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Get REAL market prices from Agmarknet
     */
    public List<Map<String, Object>> getRealMarketPrices(String state, String district, String commodity) {
        try {
            logger.info("📊 Fetching REAL prices for {} from Agmarknet...", commodity);

            // Try multiple APIs
            List<Map<String, Object>> prices = tryAgmarknetAPI(state, district, commodity);

            if (prices != null && !prices.isEmpty()) {
                logger.info("✅ Got {} REAL prices from Agmarknet", prices.size());
                return prices;
            }

            // Try government data API
            prices = tryGovernmentDataAPI(state, district, commodity);
            if (prices != null && !prices.isEmpty()) {
                logger.info("✅ Got {} prices from Government Data API", prices.size());
                return prices;
            }

            logger.warn("⚠️ Could not fetch from Agmarknet, trying alternative sources...");
            return null;

        } catch (Exception e) {
            logger.error("❌ Error fetching real prices: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Try Official Agmarknet API
     */
    private List<Map<String, Object>> tryAgmarknetAPI(String state, String district, String commodity) {
        try {
            logger.info("📡 Trying Official Agmarknet API...");

            // Agmarknet API requires specific parameters
            String url = String.format(
                    "%s?json=1&state=%s&district=%s&commodity=%s",
                    AGMARKNET_API_V1,
                    encodeSpace(state),
                    encodeSpace(district),
                    encodeSpace(commodity)
            );

            logger.info("🔗 URL: {}", url);

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return parseAgmarknetResponse(response.getBody(), state, district, commodity);
            }

        } catch (Exception e) {
            logger.warn("⚠️ Agmarknet API failed: {}", e.getMessage());
        }

        return null;
    }

    /**
     * Try Government Data API (data.gov.in)
     */
    private List<Map<String, Object>> tryGovernmentDataAPI(String state, String district, String commodity) {
        try {
            logger.info("📡 Trying Government Data API...");

            // Use government open data API
            String url = String.format(
                    "%s?api-key=579b464db66ec23bdd0000012f0b86f5e90a4d6e5eae9c82bab4eb93&filters[State]=%s&filters[District]=%s&filters[Commodity]=%s&limit=50",
                    COMMODITY_API,
                    encodeSpace(state),
                    encodeSpace(district),
                    encodeSpace(commodity)
            );

            logger.info("🔗 Calling: {}", url);

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return parseGovernmentAPIResponse(response.getBody(), state, district, commodity);
            }

        } catch (Exception e) {
            logger.warn("⚠️ Government Data API failed: {}", e.getMessage());
        }

        return null;
    }

    /**
     * Parse Agmarknet API Response
     */
    private List<Map<String, Object>> parseAgmarknetResponse(String jsonResponse,
                                                             String state, String district, String commodity) {
        List<Map<String, Object>> prices = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(jsonResponse);

            if (root.has("records") && root.get("records").isArray()) {
                root.get("records").forEach(record -> {
                    try {
                        Map<String, Object> price = new HashMap<>();
                        price.put("mandi", record.get("mandi_name").asText("Unknown Mandi"));
                        price.put("state", state);
                        price.put("district", district);
                        price.put("commodity", commodity);
                        price.put("price", record.get("modal_price").asDouble());
                        price.put("minPrice", record.get("min_price").asDouble());
                        price.put("maxPrice", record.get("max_price").asDouble());
                        price.put("quality", record.get("variety").asText("Standard"));
                        price.put("unit", "₹/quintal");
                        price.put("timestamp", record.get("arrival_date").asText());
                        price.put("source", "Agmarknet Government API");

                        prices.add(price);
                    } catch (Exception e) {
                        logger.warn("Error parsing record: {}", e.getMessage());
                    }
                });
            }
        } catch (Exception e) {
            logger.error("Error parsing Agmarknet response: {}", e.getMessage());
        }

        return prices.isEmpty() ? null : prices;
    }

    /**
     * Parse Government Data API Response
     */
    private List<Map<String, Object>> parseGovernmentAPIResponse(String jsonResponse,
                                                                 String state, String district, String commodity) {
        List<Map<String, Object>> prices = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(jsonResponse);

            if (root.has("records") && root.get("records").isArray()) {
                root.get("records").forEach(record -> {
                    try {
                        Map<String, Object> price = new HashMap<>();
                        price.put("mandi", record.get("Market").asText("Unknown Mandi"));
                        price.put("state", state);
                        price.put("district", district);
                        price.put("commodity", commodity);
                        price.put("price", record.get("Price_Per_Unit").asDouble());
                        price.put("quality", record.get("Variety").asText("Standard"));
                        price.put("unit", "₹/kg");
                        price.put("timestamp", record.get("Date").asText());
                        price.put("source", "Government Data Portal");

                        prices.add(price);
                    } catch (Exception e) {
                        logger.warn("Error parsing record: {}", e.getMessage());
                    }
                });
            }
        } catch (Exception e) {
            logger.error("Error parsing Government API response: {}", e.getMessage());
        }

        return prices.isEmpty() ? null : prices;
    }

    /**
     * Get REAL price trends from Agmarknet (historical data)
     */
    public List<Map<String, Object>> getRealPriceTrends(String state, String district, String commodity, int days) {
        try {
            logger.info("📈 Fetching REAL price trends for {} (last {} days)...", commodity, days);

            // Try to fetch historical data
            List<Map<String, Object>> trends = fetchHistoricalPrices(state, district, commodity, days);

            if (trends != null && !trends.isEmpty()) {
                logger.info("✅ Got {} historical price records", trends.size());
                return trends;
            }

            logger.warn("⚠️ Could not fetch trends from API");
            return new ArrayList<>();

        } catch (Exception e) {
            logger.error("❌ Error fetching trends: {}", e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Fetch historical prices
     */
    private List<Map<String, Object>> fetchHistoricalPrices(String state, String district, String commodity, int days) {
        try {
            // Try Agmarknet historical API
            String url = String.format(
                    "%s?json=1&state=%s&district=%s&commodity=%s&sub_commodity=&variety=&grade=&arrivals=0&from_date=&to_date=",
                    AGMARKNET_API_V1,
                    encodeSpace(state),
                    encodeSpace(district),
                    encodeSpace(commodity)
            );

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode root = objectMapper.readTree(response.getBody());

                List<Map<String, Object>> trends = new ArrayList<>();

                if (root.has("records") && root.get("records").isArray()) {
                    root.get("records").forEach(record -> {
                        Map<String, Object> trend = new HashMap<>();
                        trend.put("date", record.get("arrival_date").asText());
                        trend.put("price", record.get("modal_price").asDouble());
                        trend.put("min", record.get("min_price").asDouble());
                        trend.put("max", record.get("max_price").asDouble());
                        trends.add(trend);
                    });
                }

                return trends.isEmpty() ? null : trends;
            }

        } catch (Exception e) {
            logger.warn("Error fetching historical prices: {}", e.getMessage());
        }

        return null;
    }

    /**
     * Get all commodities available in Agmarknet
     */
    public List<String> getAvailableCommodities() {
        // Return comprehensive list of commodities from Agmarknet
        return Arrays.asList(
                // Grains
                "Wheat", "Rice", "Maize", "Barley", "Oats", "Rye", "Jowar", "Bajra", "Ragi",

                // Pulses
                "Arhar", "Gram", "Masoor", "Moong", "Urad", "Peas", "Groundnut", "Soyabean",

                // Vegetables
                "Potato", "Onion", "Tomato", "Cabbage", "Cauliflower", "Carrot", "Beetroot",
                "Brinjal", "Capsicum", "Cucumber", "Radish", "Turnip", "Lady Finger",
                "Pumpkin", "Bottle Gourd", "Bitter Gourd", "Ridge Gourd", "Knol Khol",

                // Fruits
                "Apple", "Banana", "Orange", "Lemon", "Mango", "Guava", "Pomegranate",
                "Papaya", "Pineapple", "Watermelon", "Grapes", "Strawberry", "Coconut",

                // Oilseeds & Cash Crops
                "Cotton", "Sugarcane", "Sunflower", "Mustard", "Castor", "Sesame", "Coconut",

                // Spices
                "Chilli", "Turmeric", "Coriander", "Cumin", "Black Pepper", "Cardamom",
                "Cinnamon", "Clove", "Nutmeg"
        );
    }

    /**
     * Utility: Encode spaces in URL
     */
    private String encodeSpace(String str) {
        return str.replace(" ", "%20");
    }

    /**
     * Check Agmarknet API availability
     */
    public boolean isAgmarknetAvailable() {
        try {
            String url = AGMARKNET_API_V1 + "?json=1&limit=1";
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            logger.warn("⚠️ Agmarknet API unavailable: {}", e.getMessage());
            return false;
        }
    }
}