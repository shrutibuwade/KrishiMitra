package com.farmerassistant.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.farmerassistant.backend.service.AgmarknetDirect;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/real-prices")
@CrossOrigin(origins = "http://localhost:5173")
public class RealPricesController {

    private static final Logger logger = LoggerFactory.getLogger(RealPricesController.class);

    @Autowired
    private AgmarknetDirect agmarknetDirect;

    /**
     * GET REAL MARKET PRICES FROM AGMARKNET
     * GET /api/real-prices/{state}/{district}/{commodity}
     *
     * Example: /api/real-prices/Haryana/Faridabad/Wheat
     */
    @GetMapping("/{state}/{district}/{commodity}")
    public Map<String, Object> getRealPrices(
            @PathVariable String state,
            @PathVariable String district,
            @PathVariable String commodity) {

        try {
            logger.info("🔍 Getting REAL prices for {} in {}, {}", commodity, district, state);

            List<Map<String, Object>> prices = agmarknetDirect.getRealPrices(state, district, commodity);

            Map<String, Object> response = new HashMap<>();
            response.put("success", prices != null && !prices.isEmpty());
            response.put("message", prices != null && !prices.isEmpty()
                    ? "✅ Real prices fetched"
                    : "⚠️ No prices found");
            response.put("data", prices != null ? prices : new ArrayList<>());
            response.put("state", state);
            response.put("district", district);
            response.put("commodity", commodity);
            response.put("count", prices != null ? prices.size() : 0);
            response.put("timestamp", new Date());

            return response;
        } catch (Exception e) {
            logger.error("❌ Error: {}", e.getMessage());

            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Error fetching prices");
            error.put("data", new ArrayList<>());
            error.put("error", e.getMessage());

            return error;
        }
    }

    /**
     * GET PRICE TRENDS
     * GET /api/real-prices/trends/{state}/{district}/{commodity}
     */
    @GetMapping("/trends/{state}/{district}/{commodity}")
    public Map<String, Object> getPriceTrends(
            @PathVariable String state,
            @PathVariable String district,
            @PathVariable String commodity) {

        try {
            logger.info("📈 Getting price trends for {}", commodity);

            List<Map<String, Object>> trends = agmarknetDirect.getPriceTrends(state, district, commodity);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Price trends");
            response.put("data", trends);
            response.put("commodity", commodity);

            return response;
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Error fetching trends");
            error.put("data", null);

            return error;
        }
    }

    /**
     * GET ALL COMMODITIES
     * GET /api/real-prices/commodities
     */
    @GetMapping("/commodities")
    public Map<String, Object> getCommodities() {
        try {
            List<String> commodities = agmarknetDirect.getAllCommodities();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Commodities list");
            response.put("data", commodities);
            response.put("count", commodities.size());

            return response;
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Error fetching commodities");
            error.put("data", null);

            return error;
        }
    }

    /**
     * CHECK API STATUS
     * GET /api/real-prices/health
     */
    @GetMapping("/health")
    public Map<String, Object> checkHealth() {
        try {
            Map<String, Object> status = agmarknetDirect.checkStatus();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "✅ Real Prices API Ready");
            response.put("data", status);
            response.put("timestamp", new Date());

            return response;
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Error checking status");

            return error;
        }
    }
}