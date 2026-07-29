// Using OpenWeatherMap API (Free tier)
const API_KEY = 'adf3eb15d0405538c8752e827e936533'; // Free tier key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get weather by city name (REAL-TIME)
export const getWeatherByCity = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    
    // Also get forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastResponse.json();
    
    return {
      ...data,
      forecast: forecastData.list
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};

// Get weather by coordinates (REAL-TIME GPS)
export const getWeatherByCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Location not found');
    }
    
    const data = await response.json();
    
    // Also get forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastResponse.json();
    
    return {
      ...data,
      forecast: forecastData.list
    };
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};

// Format weather data
export const formatWeatherData = (data) => {
  if (!data) return null;
  
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    windDirection: data.wind.deg,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    rainProbability: data.clouds.all,
    visibility: Math.round(data.visibility / 1000),
    uvIndex: data.uvi || 'N/A',
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000),
    icon: data.weather[0].icon
  };
};

// Format forecast data
export const formatForecastData = (forecastList) => {
  if (!forecastList || forecastList.length === 0) return [];
  
  const dailyData = {};
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const dateKey = dateStr;
    
    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        day: day,
        date: dateStr,
        maxTemp: Math.round(item.main.temp_max),
        minTemp: Math.round(item.main.temp_min),
        condition: item.weather[0].main,
        rainChance: item.clouds.all,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6),
        icon: item.weather[0].icon
      };
    } else {
      if (item.main.temp_max > dailyData[dateKey].maxTemp) {
        dailyData[dateKey].maxTemp = Math.round(item.main.temp_max);
      }
      if (item.main.temp_min < dailyData[dateKey].minTemp) {
        dailyData[dateKey].minTemp = Math.round(item.main.temp_min);
      }
    }
  });
  
  return Object.values(dailyData).slice(0, 7);
};

// Get weather icon emoji
export const getWeatherIcon = (condition) => {
  const condition_lower = condition.toLowerCase();
  
  if (condition_lower.includes('clear') || condition_lower.includes('sunny')) return '☀️';
  if (condition_lower.includes('cloud')) return '☁️';
  if (condition_lower.includes('rain') || condition_lower.includes('drizzle')) return '🌧️';
  if (condition_lower.includes('thunder') || condition_lower.includes('storm')) return '⛈️';
  if (condition_lower.includes('snow')) return '❄️';
  if (condition_lower.includes('mist') || condition_lower.includes('fog')) return '🌫️';
  
  return '🌤️';
};

// Get crop recommendation based on weather
export const getWeatherSuitability = (temperature, humidity, rainChance) => {
  const recommendations = [];
  
  // Temperature recommendations
  if (temperature < 10) {
    recommendations.push({
      type: 'Cold Season',
      crops: ['Wheat', 'Barley', 'Lentil', 'Spinach', 'Potato'],
      advice: 'Ideal temperature for winter crops'
    });
  } else if (temperature >= 10 && temperature < 20) {
    recommendations.push({
      type: 'Cool Season',
      crops: ['Wheat', 'Chickpea', 'Carrot', 'Cabbage', 'Onion'],
      advice: 'Good for Rabi (winter) crops'
    });
  } else if (temperature >= 20 && temperature < 30) {
    recommendations.push({
      type: 'Warm Season',
      crops: ['Maize', 'Sugarcane', 'Cotton', 'Rice', 'Tomato'],
      advice: 'Ideal for warm season crops'
    });
  } else {
    recommendations.push({
      type: 'Hot Season',
      crops: ['Sorghum', 'Mango', 'Banana', 'Brinjal'],
      advice: 'Suitable for heat-resistant crops'
    });
  }
  
  // Humidity recommendations
  if (humidity > 75) {
    recommendations.push({
      type: 'High Humidity Alert ⚠️',
      crops: ['Monitor for fungal diseases'],
      advice: 'High humidity increases disease risk. Ensure proper drainage and spray fungicides if needed.'
    });
  } else if (humidity < 40) {
    recommendations.push({
      type: 'Low Humidity',
      crops: ['Increase irrigation'],
      advice: 'Low humidity may cause water stress. Ensure adequate irrigation.'
    });
  }
  
  // Rainfall recommendations
  if (rainChance > 70) {
    recommendations.push({
      type: 'Heavy Rain Expected 🌧️',
      crops: ['Reduce irrigation'],
      advice: 'Heavy rain expected. Reduce irrigation. Good for monsoon crops.'
    });
  } else if (rainChance < 20) {
    recommendations.push({
      type: 'Dry Conditions',
      crops: ['Maintain irrigation'],
      advice: 'Low rainfall expected. Maintain regular irrigation schedule.'
    });
  }
  
  return recommendations;
};

// Get farming tips based on weather
export const getFarmingTips = (temperature, humidity, rainChance, windSpeed) => {
  const tips = [];
  
  // Irrigation tips
  if (rainChance > 60) {
    tips.push('💧 Rain Expected: Reduce or postpone irrigation');
  } else if (temperature > 25) {
    tips.push('💧 High Temperature: Increase irrigation frequency');
  }
  
  // Spraying tips
  if (humidity > 70 && windSpeed < 10) {
    tips.push('🌫️ Good conditions for pesticide spraying');
  } else if (windSpeed > 20) {
    tips.push('💨 High wind: Avoid spraying pesticides');
  }
  
  // Harvesting tips
  if (rainChance < 30 && temperature > 15) {
    tips.push('🌾 Good harvesting weather today');
  } else if (rainChance > 60) {
    tips.push('🌧️ Delay harvesting - rain expected');
  }
  
  // Planting tips
  if (humidity > 60 && temperature >= 20 && rainChance > 40) {
    tips.push('🌱 Ideal conditions for planting');
  }
  
  // Pest management
  if (humidity > 75) {
    tips.push('🐛 High humidity: Monitor for fungal diseases and pests');
  }
  
  return tips;
};