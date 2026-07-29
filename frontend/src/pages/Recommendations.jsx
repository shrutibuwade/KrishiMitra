import React, { useState, useEffect } from 'react';
import '../styles/Recommendations.css';
import cropsData from '../data/cropsData';

const Recommendations = () => {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [season, setSeason] = useState('All Seasons');
  const [soilType, setSoilType] = useState('All Types');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  const seasons = ['All Seasons', 'Rabi (Winter)', 'Kharif (Monsoon)', 'Summer'];
  const soilTypes = ['All Types', 'Well-drained', 'Loamy', 'Black soil', 'Sandy loam', 'Clay loam'];

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
    console.log('Fetching districts for state:', selectedState);
    const response = await fetch(`http://localhost:8080/api/locations/districts/${selectedState}`);
    const result = await response.json();
    console.log('Districts response:', result);
    
    if (result.success && result.data) {
      console.log('Districts loaded:', result.data);
      setDistricts(result.data);
    } else {
      console.log('No districts data in response');
      setDistricts([]);
    }
  } catch (error) {
    console.log('Error fetching districts:', error);
    setDistricts([]);
  }
};

  const fetchWeather = async (locationName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationName},IN&appid=4d8fb5b93d4af21ebc66b2948410284d&units=metric`
      );
      const data = await response.json();
      return {
        temp: data.main.temp,
        rainfall: data.clouds.all,
        humidity: data.main.humidity,
        description: data.weather[0].main
      };
    } catch (error) {
      console.log('Weather fetch error:', error);
      return null;
    }
  };

  const getRecommendations = async () => {
    if (!state || !district) {
      alert('Please select both state and district');
      return;
    }

    setLoading(true);

    try {
      const weatherData = await fetchWeather(district);
      setWeather(weatherData);

      let filtered = cropsData.filter(crop => {
        if (season !== 'All Seasons' && !crop.season.includes(season)) {
          return false;
        }

        if (soilType !== 'All Types' && !crop.soil.includes(soilType)) {
          return false;
        }

        if (weatherData) {
          const temp = weatherData.temp;
          const humidity = weatherData.humidity;

          if (temp < 15 && crop.season.includes('Rabi')) return true;
          if (temp > 25 && humidity > 60 && crop.season.includes('Kharif')) return true;
          if (temp > 30 && crop.season.includes('Summer')) return true;
          if (crop.season.includes('Perennial')) return true;
        }

        return true;
      });

      setRecommendations(filtered);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      alert('Error fetching recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendations-page">
      <section className="recommendations-hero">
        <h1> Smart Crop Recommendations</h1>
      </section>

      <div className="recommendations-search">
        <div className="search-card">
          <h2>🔍 Find Your Best Crops</h2>

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
              <label>🌾 Season</label>
              <select value={season} onChange={(e) => setSeason(e.target.value)} className="form-select">
                {seasons.map(s => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>

            <div className="form-group">
              <label>🌱 Soil Type</label>
              <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className="form-select">
                {soilTypes.map(s => (<option key={s} value={s}>{s}</option>))}
              </select>
            </div>

            <button onClick={getRecommendations} disabled={loading || !state || !district} className="get-recommendations-btn">
              {loading ? '⏳ Loading...' : '🚀 Get Recommendations'}
            </button>
          </div>

          {weather && (
            <div className="weather-info">
              <h3>📊 Current Weather in {district}, {state}</h3>
              <div className="weather-grid">
                <div className="weather-item">
                  <span>🌡️ Temperature</span>
                  <strong>{weather.temp}°C</strong>
                </div>
                <div className="weather-item">
                  <span>💧 Humidity</span>
                  <strong>{weather.humidity}%</strong>
                </div>
                <div className="weather-item">
                  <span>☁️ Condition</span>
                  <strong>{weather.description}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations-results">
          <h2>✅ Recommended Crops for You</h2>
          <p>Based on weather conditions and your preferences</p>

          <div className="recommendations-grid">
            {recommendations.map(crop => (
              <div key={crop.id} className="recommendation-card">
                <div className="rec-icon">{crop.icon}</div>
                <h3>{crop.name}</h3>
                <p className="rec-hindi">{crop.hindi}</p>
                
                <div className="rec-details">
                  <div className="detail">
                    <span className="label">Season:</span>
                    <span className="value">{crop.season}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Duration:</span>
                    <span className="value">{crop.duration}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Expected Yield:</span>
                    <span className="value">{crop.yield}</span>
                  </div>
                </div>

                <p className="rec-reason">Perfect for {district}, {state}</p>

                <button className="view-details-btn" onClick={() => window.location.href = `/crops/${crop.id}`}>
                  View Full Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!state && !district && (
        <div className="empty-state">
          <p>🔍 Select your state and district, then click "Get Recommendations"</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;