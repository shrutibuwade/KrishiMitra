// Real-Time Market Prices API Service
// Calls Spring Boot backend on port 8080

const API_BASE_URL = 'http://localhost:8080/api/prices';

/**
 * Get market price for a commodity from backend
 */
export const getMarketPrice = async (commodity, market) => {
  try {
    const url = `${API_BASE_URL}/${commodity}/${market}`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'API returned error');
    }

    return {
      commodity: data.commodity,
      market: data.market,
      price: data.price,
      previousPrice: data.previousPrice,
      change: data.change,
      changePercent: data.changePercent,
      trend: data.trend,
      quality: data.quality,
      unit: data.unit,
      timestamp: data.timestamp,
      source: data.source,
      success: true
    };
  } catch (error) {
    console.error('Market Price API Error:', error);
    return {
      success: false,
      error: error.message,
      commodity: commodity,
      market: market
    };
  }
};

/**
 * Get prices for all markets of a commodity
 */
export const getPricesByMarkets = async (commodity) => {
  try {
    const url = `${API_BASE_URL}/${commodity}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'API returned error');
    }

    // Convert to array format
    const prices = [];
    for (const [market, priceData] of Object.entries(data.prices)) {
      prices.push({
        market: market,
        ...priceData
      });
    }

    return prices;
  } catch (error) {
    console.error('Get Prices by Markets Error:', error);
    return [];
  }
};

/**
 * Get price trends for a commodity
 */
export const getPriceTrend = async (commodity, days = 30) => {
  try {
    const url = `${API_BASE_URL}/trends/${commodity}?days=${days}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'API returned error');
    }

    return {
      commodity: data.commodity,
      trends: data.trend_data,
      days: data.days,
      minPrice: data.min_price,
      maxPrice: data.max_price,
      avgPrice: data.average_price,
      success: true
    };
  } catch (error) {
    console.error('Price Trend API Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get all available commodities
 */
export const getAllCommodities = async () => {
  try {
    const url = `http://localhost:8080/api/commodities/all`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'API returned error');
    }

    return {
      commodities: data.data,
      count: data.data.length,
      success: true
    };
  } catch (error) {
    console.error('Get Commodities Error:', error);
    return {
      success: false,
      commodities: [
        'Wheat', 'Rice', 'Cotton', 'Potato', 'Onion', 'Tomato', 'Sugarcane', 'Maize'
      ],
      error: error.message
    };
  }
};

/**
 * Get all available markets
 */
export const getAllMarkets = async () => {
  try {
    const url = `http://localhost:8080/api/markets/all`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'API returned error');
    }

    return {
      markets: data.data,
      count: data.data.length,
      success: true
    };
  } catch (error) {
    console.error('Get Markets Error:', error);
    return {
      success: false,
      markets: [
        'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'
      ],
      error: error.message
    };
  }
};

/**
 * Format price with Indian currency
 */
export const formatPrice = (price) => {
  if (!price) return '₹0';
  return `₹${Math.round(price).toLocaleString('en-IN')}`;
};

/**
 * Get price change information
 */
export const getPriceChangeInfo = (change) => {
  if (change > 0) {
    return {
      direction: 'up',
      icon: '↑',
      color: '#4caf50',
      text: `+₹${Math.round(change)}`
    };
  } else if (change < 0) {
    return {
      direction: 'down',
      icon: '↓',
      color: '#f44336',
      text: `₹${Math.round(change)}`
    };
  }
  return {
    direction: 'stable',
    icon: '→',
    color: '#ff9800',
    text: 'Stable'
  };
};

/**
 * Check if backend API is running
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/prices/health');
    return response.ok;
  } catch (error) {
    console.error('API Health Check Error:', error);
    return false;
  }
};

export default {
  getMarketPrice,
  getPricesByMarkets,
  getPriceTrend,
  getAllCommodities,
  getAllMarkets,
  formatPrice,
  getPriceChangeInfo,
  checkApiHealth
};