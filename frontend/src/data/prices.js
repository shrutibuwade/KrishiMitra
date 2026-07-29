// Real-time market prices for Indian crops
export const pricesData = {
  rice: {
    name: 'Rice',
    hindiName: 'चावल',
    unit: 'quintal', // 100kg
    currentPrice: 2850,
    priceChange: 45, // +45 rupees
    percentChange: 1.6, // +1.6%
    lastUpdated: new Date(),
    locations: [
      { city: 'Delhi', market: 'Azadpur Mandi', price: 2950, trend: 'up' },
      { city: 'Mumbai', market: 'Vashi Mandi', price: 2850, trend: 'stable' },
      { city: 'Punjab', market: 'Jalandhar Mandi', price: 2700, trend: 'down' },
      { city: 'Madhya Pradesh', market: 'Indore Mandi', price: 2800, trend: 'up' },
      { city: 'Haryana', market: 'Tohana Mandi', price: 2750, trend: 'stable' },
    ],
    trend: [
      { date: '5 days ago', price: 2805 },
      { date: '4 days ago', price: 2820 },
      { date: '3 days ago', price: 2835 },
      { date: '2 days ago', price: 2840 },
      { date: 'Yesterday', price: 2850 },
      { date: 'Today', price: 2850 },
    ],
    alert: { type: 'info', message: 'Prices stable. Good time to sell. Monsoon may affect prices next month.' }
  },

  wheat: {
    name: 'Wheat',
    hindiName: 'गेहूं',
    unit: 'quintal',
    currentPrice: 2650,
    priceChange: -75,
    percentChange: -2.8,
    lastUpdated: new Date(),
    locations: [
      { city: 'Punjab', market: 'Ludhiana Mandi', price: 2700, trend: 'down' },
      { city: 'Haryana', market: 'Karnal Mandi', price: 2680, trend: 'down' },
      { city: 'Delhi', market: 'Azadpur Mandi', price: 2650, trend: 'down' },
      { city: 'Uttar Pradesh', market: 'Meerut Mandi', price: 2620, trend: 'stable' },
      { city: 'Rajasthan', market: 'Kota Mandi', price: 2600, trend: 'up' },
    ],
    trend: [
      { date: '5 days ago', price: 2800 },
      { date: '4 days ago', price: 2760 },
      { date: '3 days ago', price: 2720 },
      { date: '2 days ago', price: 2680 },
      { date: 'Yesterday', price: 2660 },
      { date: 'Today', price: 2650 },
    ],
    alert: { type: 'warning', message: '📉 Prices declining. Harvest season impact. Consider storage if possible.' }
  },

  cotton: {
    name: 'Cotton',
    hindiName: 'कपास',
    unit: 'quintal',
    currentPrice: 6200,
    priceChange: 150,
    percentChange: 2.5,
    lastUpdated: new Date(),
    locations: [
      { city: 'Gujarat', market: 'Ahmedabad Mandi', price: 6250, trend: 'up' },
      { city: 'Maharashtra', market: 'Akola Mandi', price: 6200, trend: 'up' },
      { city: 'Telangana', market: 'Hyderabad Mandi', price: 6150, trend: 'stable' },
      { city: 'Karnataka', market: 'Belgaum Mandi', price: 6100, trend: 'down' },
      { city: 'Madhya Pradesh', market: 'Indore Mandi', price: 6180, trend: 'up' },
    ],
    trend: [
      { date: '5 days ago', price: 6050 },
      { date: '4 days ago', price: 6080 },
      { date: '3 days ago', price: 6120 },
      { date: '2 days ago', price: 6180 },
      { date: 'Yesterday', price: 6190 },
      { date: 'Today', price: 6200 },
    ],
    alert: { type: 'success', message: '✅ Strong prices! Global demand increasing. Good time to sell.' }
  },

  potato: {
    name: 'Potato',
    hindiName: 'आलू',
    unit: 'quintal',
    currentPrice: 1850,
    priceChange: 120,
    percentChange: 6.9,
    lastUpdated: new Date(),
    locations: [
      { city: 'Uttar Pradesh', market: 'Meerut Mandi', price: 1950, trend: 'up' },
      { city: 'West Bengal', market: 'Kolkata Mandi', price: 1900, trend: 'up' },
      { city: 'Punjab', market: 'Ludhiana Mandi', price: 1800, trend: 'stable' },
      { city: 'Bihar', market: 'Patna Mandi', price: 1750, trend: 'down' },
      { city: 'Madhya Pradesh', market: 'Indore Mandi', price: 1850, trend: 'up' },
    ],
    trend: [
      { date: '5 days ago', price: 1730 },
      { date: '4 days ago', price: 1760 },
      { date: '3 days ago', price: 1790 },
      { date: '2 days ago', price: 1820 },
      { date: 'Yesterday', price: 1840 },
      { date: 'Today', price: 1850 },
    ],
    alert: { type: 'success', message: '📈 Rising prices! Good supply & demand. Best selling period.' }
  },

  tomato: {
    name: 'Tomato',
    hindiName: 'टमाटर',
    unit: 'quintal',
    currentPrice: 1200,
    priceChange: -350,
    percentChange: -22.6,
    lastUpdated: new Date(),
    locations: [
      { city: 'Karnataka', market: 'Bangalore Mandi', price: 1300, trend: 'down' },
      { city: 'Maharashtra', market: 'Pune Mandi', price: 1150, trend: 'down' },
      { city: 'Madhya Pradesh', market: 'Indore Mandi', price: 1200, trend: 'down' },
      { city: 'Haryana', market: 'Karnal Mandi', price: 1100, trend: 'down' },
      { city: 'Delhi', market: 'Azadpur Mandi', price: 1250, trend: 'stable' },
    ],
    trend: [
      { date: '5 days ago', price: 1650 },
      { date: '4 days ago', price: 1550 },
      { date: '3 days ago', price: 1400 },
      { date: '2 days ago', price: 1300 },
      { date: 'Yesterday', price: 1250 },
      { date: 'Today', price: 1200 },
    ],
    alert: { type: 'warning', message: '📉 Sharp price drop due to oversupply. Hold if possible. Wait for prices to recover.' }
  },

  onion: {
    name: 'Onion',
    hindiName: 'प्याज',
    unit: 'quintal',
    currentPrice: 2100,
    priceChange: 200,
    percentChange: 10.5,
    lastUpdated: new Date(),
    locations: [
      { city: 'Maharashtra', market: 'Nashik Mandi', price: 2200, trend: 'up' },
      { city: 'Madhya Pradesh', market: 'Indore Mandi', price: 2100, trend: 'up' },
      { city: 'Karnataka', market: 'Bangalore Mandi', price: 2050, trend: 'stable' },
      { city: 'Telangana', market: 'Hyderabad Mandi', price: 2000, trend: 'down' },
      { city: 'Delhi', market: 'Azadpur Mandi', price: 2150, trend: 'up' },
    ],
    trend: [
      { date: '5 days ago', price: 1900 },
      { date: '4 days ago', price: 1950 },
      { date: '3 days ago', price: 2000 },
      { date: '2 days ago', price: 2050 },
      { date: 'Yesterday', price: 2080 },
      { date: 'Today', price: 2100 },
    ],
    alert: { type: 'success', message: '✅ Strong uptrend! Demand good. Sell when prices peak.' }
  },

  corn: {
    name: 'Corn',
    hindiName: 'मक्का',
    unit: 'quintal',
    currentPrice: 1950,
    priceChange: 50,
    percentChange: 2.6,
    lastUpdated: new Date(),
    locations: [
      { city: 'Karnataka', market: 'Belgaum Mandi', price: 1980, trend: 'up' },
      { city: 'Maharashtra', market: 'Pune Mandi', price: 1950, trend: 'stable' },
      { city: 'Madhya Pradesh', market: 'Indore Mandi', price: 1950, trend: 'stable' },
      { city: 'Andhra Pradesh', market: 'Hyderabad Mandi', price: 1900, trend: 'down' },
      { city: 'Tamil Nadu', market: 'Chennai Mandi', price: 1920, trend: 'up' },
    ],
    trend: [
      { date: '5 days ago', price: 1900 },
      { date: '4 days ago', price: 1920 },
      { date: '3 days ago', price: 1930 },
      { date: '2 days ago', price: 1940 },
      { date: 'Yesterday', price: 1945 },
      { date: 'Today', price: 1950 },
    ],
    alert: { type: 'info', message: 'ℹ️ Stable prices. Steady demand. Good time for normal selling.' }
  },

  sugarcane: {
    name: 'Sugarcane',
    hindiName: 'गन्ना',
    unit: 'quintal',
    currentPrice: 350,
    priceChange: 10,
    percentChange: 2.9,
    lastUpdated: new Date(),
    locations: [
      { city: 'Uttar Pradesh', market: 'Lucknow Mandi', price: 360, trend: 'up' },
      { city: 'Maharashtra', market: 'Pune Mandi', price: 350, trend: 'stable' },
      { city: 'Karnataka', market: 'Belgaum Mandi', price: 340, trend: 'down' },
      { city: 'Tamil Nadu', market: 'Chennai Mandi', price: 355, trend: 'up' },
      { city: 'Madhya Pradesh', market: 'Indore Mandi', price: 345, trend: 'stable' },
    ],
    trend: [
      { date: '5 days ago', price: 340 },
      { date: '4 days ago', price: 342 },
      { date: '3 days ago', price: 345 },
      { date: '2 days ago', price: 348 },
      { date: 'Yesterday', price: 349 },
      { date: 'Today', price: 350 },
    ],
    alert: { type: 'info', message: 'ℹ️ Slight improvement in prices. Mills are purchasing steadily.' }
  }
};

// Get price status
export const getPriceStatus = (priceChange) => {
  if (priceChange > 100) return { label: 'High Rise', color: '#22c55e', emoji: '📈' };
  if (priceChange > 0) return { label: 'Rising', color: '#84cc16', emoji: '↗️' };
  if (priceChange < -100) return { label: 'Sharp Fall', color: '#dc2626', emoji: '📉' };
  if (priceChange < 0) return { label: 'Falling', color: '#f97316', emoji: '↘️' };
  return { label: 'Stable', color: '#3b82f6', emoji: '➡️' };
};

// Get alert color
export const getAlertColor = (type) => {
  const colors = {
    success: { bg: '#dcfce7', text: '#166534', border: '#22c55e' },
    warning: { bg: '#fee2e2', text: '#991b1b', border: '#dc2626' },
    info: { bg: '#dbeafe', text: '#0c2d6b', border: '#3b82f6' }
  };
  return colors[type] || colors.info;
};

// Get best location
export const getBestSellingLocation = (crop) => {
  if (!crop.locations || crop.locations.length === 0) return null;
  
  const best = crop.locations.reduce((prev, current) => 
    current.price > prev.price ? current : prev
  );
  
  return best;
};

// Get worst location
export const getWorstSellingLocation = (crop) => {
  if (!crop.locations || crop.locations.length === 0) return null;
  
  const worst = crop.locations.reduce((prev, current) => 
    current.price < prev.price ? current : prev
  );
  
  return worst;
};

// Calculate average price
export const getAveragePrice = (locations) => {
  if (locations.length === 0) return 0;
  const sum = locations.reduce((acc, loc) => acc + loc.price, 0);
  return Math.round(sum / locations.length);
};

// Get price recommendation
export const getPriceRecommendation = (crop) => {
  const change = crop.percentChange;
  
  if (change > 5) {
    return {
      action: '✅ SELL NOW',
      reason: 'Prices are rising fast. Good profit opportunity.',
      color: '#22c55e'
    };
  } else if (change > 0) {
    return {
      action: '🤔 GOOD TIME',
      reason: 'Prices are stable or slightly up. Fair selling time.',
      color: '#84cc16'
    };
  } else if (change < -5) {
    return {
      action: '⏳ WAIT',
      reason: 'Prices are falling. Hold if you can, prices may recover.',
      color: '#dc2626'
    };
  } else {
    return {
      action: '📊 NEUTRAL',
      reason: 'Prices are relatively stable. Sell if needed.',
      color: '#f59e0b'
    };
  }
};

export default pricesData;