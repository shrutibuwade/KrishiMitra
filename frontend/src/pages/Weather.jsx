import React, { useState, useEffect } from 'react';
import '../styles/Weather.css';

const Weather = () => {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = '026c8b11a709da5597cb3febe0a117a8';

  // Fetch states on mount
  useEffect(() => {
    fetchStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    if (state) {
      fetchDistricts(state);
      setDistrict('');
    }
  }, [state]);

  const fetchStates = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/locations/states');
      const result = await response.json();
      if (result.success && result.data) {
        setStates(result.data);
      }
    } catch (error) {
      console.log('Error fetching states:', error);
    }
  };

  const fetchDistricts = async (selectedState) => {
    try {
      const response = await fetch(`http://localhost:8080/api/locations/districts/${selectedState}`);
      const result = await response.json();
      if (result.success && result.data) {
        setDistricts(result.data);
      }
    } catch (error) {
      console.log('Error fetching districts:', error);
      setDistricts([]);
    }
  };

  const fetchWeather = async () => {
  if (!state || !district) {
    alert('Please select both state and district');
    return;
  }

  setLoading(true);
  try {
    // Current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${district},IN&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error(`Weather API error: ${currentResponse.status}`);
    }
    
    const currentData = await currentResponse.json();
    setCurrentWeather(currentData);

    // 5-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${district},IN&appid=${API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      throw new Error(`Forecast API error: ${forecastResponse.status}`);
    }
    
    const forecastJson = await forecastResponse.json();
    
    // Check if list exists
    if (!forecastJson.list) {
      throw new Error('No forecast data available');
    }
    
    // Group by day
    const groupedByDay = {};
    forecastJson.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!groupedByDay[date]) {
        groupedByDay[date] = [];
      }
      groupedByDay[date].push(item);
    });

    // Process forecast data
    const processedForecast = Object.keys(groupedByDay).slice(0, 7).map(date => {
      const dayData = groupedByDay[date];
      const avgTemp = (dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length).toFixed(1);
      const maxTemp = Math.max(...dayData.map(item => item.main.temp));
      const minTemp = Math.min(...dayData.map(item => item.main.temp));
      const avgHumidity = (dayData.reduce((sum, item) => sum + item.main.humidity, 0) / dayData.length).toFixed(0);
      const rainChance = dayData.filter(item => item.rain).length > 0 ? 
        (dayData.filter(item => item.rain).length / dayData.length * 100).toFixed(0) : 0;
      const snowChance = dayData.filter(item => item.snow).length > 0 ? 
        (dayData.filter(item => item.snow).length / dayData.length * 100).toFixed(0) : 0;
      const windSpeed = (dayData.reduce((sum, item) => sum + item.wind.speed, 0) / dayData.length).toFixed(1);
      const mainCondition = dayData[0].weather[0].main;
      const cloudiness = (dayData.reduce((sum, item) => sum + item.clouds.all, 0) / dayData.length).toFixed(0);

      return {
        date,
        avgTemp,
        maxTemp: maxTemp.toFixed(1),
        minTemp: minTemp.toFixed(1),
        humidity: avgHumidity,
        rainChance,
        snowChance,
        windSpeed,
        condition: mainCondition,
        cloudiness
      };
    });

    setForecastData(processedForecast);
  } catch (error) {
    console.error('Error fetching weather:', error);
    alert(`Error: ${error.message}. Please check your location or try again.`);
    setCurrentWeather(null);
    setForecastData([]);
  } finally {
    setLoading(false);
  }
};

  const getWeatherIcon = (condition) => {
    switch(condition?.toLowerCase()) {
      case 'clouds': return '☁️';
      case 'rain': return '🌧️';
      case 'clear': return '☀️';
      case 'snow': return '❄️';
      case 'drizzle': return '🌦️';
      case 'thunderstorm': return '⛈️';
      case 'mist': return '🌫️';
      default: return '🌤️';
    }
  };

  return (
    <div className="weather-page">
      <section className="weather-hero">
        <h1> Real-Time Weather</h1>
      </section>

      <div className="weather-search-section">
        <div className="search-card">
          <div className="search-form">
  <div className="form-group">
    <label>📍 State</label>
    <select value={state} onChange={(e) => setState(e.target.value)} className="form-select">
      <option value="">Select State</option>
      {states.map(s => (<option key={s} value={s}>{s}</option>))}
    </select>
  </div>

  <div className="form-group">
    <label>📍 District</label>
    <select value={district} onChange={(e) => setDistrict(e.target.value)} className="form-select" disabled={!state}>
      <option value="">Select District</option>
      {districts.map(d => (<option key={d} value={d}>{d}</option>))}
    </select>
  </div>

  <div className="form-group">
    <label style={{ visibility: 'hidden' }}>Search</label>
    <button onClick={fetchWeather} disabled={loading || !state || !district} className="search-btn">
      {loading ? '⏳ Loading...' : '🔍 Search'}
    </button>
  </div>
</div>
        </div>
      </div>

      {currentWeather && (
        <>
          {/* CURRENT WEATHER */}
          <div className="current-weather-section">
            <h2>Current Weather - {district}, {state}</h2>
            <div className="current-weather-card">
              <div className="current-main">
                <div className="weather-icon-large">{getWeatherIcon(currentWeather.weather[0].main)}</div>
                <div className="temperature-display">
                  <div className="temp">{currentWeather.main.temp.toFixed(1)}°C</div>
                  <div className="condition">{currentWeather.weather[0].main}</div>
                  <div className="description">{currentWeather.weather[0].description}</div>
                </div>
              </div>

              <div className="current-details-grid">
                <div className="detail-box">
                  <span className="label">🌡️ Feels Like</span>
                  <strong>{currentWeather.main.feels_like.toFixed(1)}°C</strong>
                </div>
                <div className="detail-box">
                  <span className="label">💧 Humidity</span>
                  <strong>{currentWeather.main.humidity}%</strong>
                </div>
                <div className="detail-box">
                  <span className="label">💨 Wind Speed</span>
                  <strong>{currentWeather.wind.speed.toFixed(1)} m/s</strong>
                </div>
                <div className="detail-box">
                  <span className="label">🌫️ Visibility</span>
                  <strong>{(currentWeather.visibility / 1000).toFixed(1)} km</strong>
                </div>
                <div className="detail-box">
                  <span className="label">🔽 Pressure</span>
                  <strong>{currentWeather.main.pressure} hPa</strong>
                </div>
                <div className="detail-box">
                  <span className="label">☁️ Cloudiness</span>
                  <strong>{currentWeather.clouds.all}%</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 7-DAY FORECAST */}
          <div className="forecast-section">
            <h2>7-Day Forecast</h2>
            <div className="forecast-grid">
              {forecastData.map((day, index) => (
                <div key={index} className="forecast-card">
                  <div className="forecast-date">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  
                  <div className="forecast-icon">{getWeatherIcon(day.condition)}</div>
                  <div className="forecast-condition">{day.condition}</div>

                  <div className="forecast-temps">
                    <div className="temp-high">↑ {day.maxTemp}°C</div>
                    <div className="temp-low">↓ {day.minTemp}°C</div>
                  </div>

                  <div className="forecast-details">
                    <div className="detail-item">
                      <span>💧 Humidity</span>
                      <strong>{day.humidity}%</strong>
                    </div>
                    <div className="detail-item">
                      <span>💨 Wind</span>
                      <strong>{day.windSpeed} m/s</strong>
                    </div>
                    <div className="detail-item">
                      <span>☁️ Clouds</span>
                      <strong>{day.cloudiness}%</strong>
                    </div>
                    <div className="detail-item">
                      <span>🌧️ Rain Chance</span>
                      <strong>{day.rainChance}%</strong>
                    </div>
                    {day.snowChance > 0 && (
                      <div className="detail-item">
                        <span>❄️ Snow Chance</span>
                        <strong>{day.snowChance}%</strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!state || !district && (
        <div className="empty-state">
          <p>🔍 Select your state and district to see weather forecast</p>
        </div>
      )}
    </div>
  );
};

export default Weather;