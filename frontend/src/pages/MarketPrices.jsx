
import React, { useState, useEffect } from 'react';
import '../styles/MarketPrices.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_BASE_URL = 'http://localhost:8080/api';

const MarketPrices = () => {
  // State Management
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [commodities, setCommodities] = useState([]);
  
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  
  const [prices, setPrices] = useState([]);
  const [trends, setTrends] = useState([]);
  const [showPrices, setShowPrices] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load initial data on mount
  useEffect(() => {
    loadStates();
    loadCommodities();
  }, []);

  // Load states from backend
  const loadStates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/locations/states`);
      const data = await response.json();
      
      if (data.success) {
        setStates(data.data);
        console.log(`✅ Loaded ${data.data.length} states`);
      } else {
        setError('Failed to load states');
      }
    } catch (err) {
      console.error('Error loading states:', err);
      setError('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  // Load commodities from backend
  const loadCommodities = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/real-prices/commodities`);
      const data = await response.json();
      
      if (data.success) {
        setCommodities(data.data);
        if (data.data.length > 0) {
          setSelectedCommodity(data.data[0]);
        }
        console.log(`✅ Loaded ${data.data.length} commodities`);
      }
    } catch (err) {
      console.error('Error loading commodities:', err);
    }
  };

  // Handle state change - load districts
  const handleStateChange = async (stateName) => {
    setSelectedState(stateName);
    setSelectedDistrict('');
    setShowPrices(false);
    setPrices([]);
    setTrends([]);

    if (!stateName) {
      setDistricts([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/locations/districts/${stateName}`);
      const data = await response.json();
      
      if (data.success) {
        setDistricts(data.data);
        console.log(`✅ Loaded ${data.data.length} districts for ${stateName}`);
      } else {
        setError('Failed to load districts');
        setDistricts([]);
      }
    } catch (err) {
      console.error('Error loading districts:', err);
      setError('Error loading districts');
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch REAL prices from backend
  const handleGetPrices = async () => {
    if (!selectedState || !selectedDistrict || !selectedCommodity) {
      setError('Please select State, District, and Commodity');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Fetch real prices
      const pricesResponse = await fetch(
        `${API_BASE_URL}/real-prices/${selectedState}/${selectedDistrict}/${selectedCommodity}`
      );
      const pricesData = await pricesResponse.json();

      if (pricesData.success && pricesData.data && pricesData.data.length > 0) {
        setPrices(pricesData.data);
        console.log(`✅ Got ${pricesData.data.length} real prices`);

        // Fetch trends
        const trendsResponse = await fetch(
          `${API_BASE_URL}/real-prices/trends/${selectedState}/${selectedDistrict}/${selectedCommodity}`
        );
        const trendsData = trendsResponse.json();
        setTrends((await trendsData).data || []);
      } else {
        setError('No prices found for this selection');
        setPrices([]);
        setTrends([]);
      }

      setShowPrices(true);
    } catch (err) {
      console.error('Error fetching prices:', err);
      setError('Error fetching prices from server');
      setPrices([]);
      setShowPrices(false);
    } finally {
      setLoading(false);
    }
  };

  // Calculate price change
  const getPriceChange = (current, min, max) => {
    if (!min || !max) {
      return { direction: 'stable', icon: '→', percent: '0' };
    }

    const avgPrice = (min + max) / 2;
    const change = current - avgPrice;
    const percent = ((change / avgPrice) * 100).toFixed(2);

    return {
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      icon: change > 0 ? '📈' : change < 0 ? '📉' : '→',
      change: Math.round(change),
      percent: percent,
    };
  };

  return (
    <div className="market-prices-container">
      {/* Header */}
      <div className="market-prices-header">
        <div className="market-prices-header-content">
          <h1> Live Market Prices</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="market-prices-main">
        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
            <button onClick={() => setError('')}>×</button>
          </div>
        )}

        {/* Filter Section */}
        <div className="filter-section">
          {/* State Dropdown */}
          <div className="filter-group">
            <label>📍 State</label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="filter-select"
              disabled={loading}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div className="filter-group">
            <label>🏘️ District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setShowPrices(false);
              }}
              className="filter-select"
              disabled={!selectedState || loading || districts.length === 0}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Commodity Dropdown */}
          <div className="filter-group">
            <label>🌾 Commodity</label>
            <select
              value={selectedCommodity}
              onChange={(e) => {
                setSelectedCommodity(e.target.value);
                setShowPrices(false);
              }}
              className="filter-select"
              disabled={commodities.length === 0}
            >
              {commodities.map((commodity) => (
                <option key={commodity} value={commodity}>
                  {commodity}
                </option>
              ))}
            </select>
          </div>

          {/* Get Prices Button */}
          <button
            className="get-prices-btn"
            onClick={handleGetPrices}
            disabled={loading || !selectedState || !selectedDistrict || !selectedCommodity}
          >
            {loading ? '⏳ Loading...' : '💰 Get Prices'}
          </button>
        </div>

        {/* Price Cards Section */}
        {showPrices && prices.length > 0 && (
          <div className="prices-section">
            <h2>💹 Market Prices - {selectedCommodity}</h2>
            <p className="prices-subtitle">
              {selectedDistrict}, {selectedState}
            </p>

            <div className="prices-cards-container">
              {prices.map((price, index) => {
                const priceChange = getPriceChange(price.price, price.minPrice, price.maxPrice);

                return (
                  <div key={index} className="price-card">
                    <div className="price-card-header">
                      <h3>{price.mandi}</h3>
                      <span className="timestamp">{price.timestamp || 'Today'}</span>
                    </div>

                    <div className="price-card-body">
                      <div className="price-main">
                        <div className="price-value">
                          <span className="currency">₹</span>
                          <span className="amount">{Math.round(price.price)}</span>
                          <span className="unit">/{price.unit || 'quintal'}</span>
                        </div>

                        <div className={`price-change ${priceChange.direction}`}>
                          <span className="change-icon">{priceChange.icon}</span>
                          <span className="change-value">
                            {priceChange.direction !== 'stable'
                              ? `${priceChange.change > 0 ? '+' : ''}${priceChange.change}`
                              : 'Stable'}
                          </span>
                          {priceChange.direction !== 'stable' && (
                            <span className="change-percent">({priceChange.percent}%)</span>
                          )}
                        </div>
                      </div>

                      <div className="price-details">
                        <div className="detail-item">
                          <span className="detail-label">Quality:</span>
                          <span className="detail-value quality-badge">
                            {price.quality || 'Standard'}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Range:</span>
                          <span className="detail-value">
                            ₹{Math.round(price.minPrice || 0)} - ₹{Math.round(price.maxPrice || 0)}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Source:</span>
                          <span className="detail-value">{price.source || 'Agmarknet'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chart Section */}
        {showPrices && trends.length > 0 && (
          <div className="chart-section">
            <h2>📈 Price Trends (Last 30 Days)</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `₹${Math.round(value)}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#2d5016"
                    strokeWidth={2}
                    dot={{ fill: '#2d5016', r: 4 }}
                    name={selectedCommodity}
                  />
                  {trends[0]?.min && (
                    <Line
                      type="monotone"
                      dataKey="min"
                      stroke="#ff9800"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Min Price"
                    />
                  )}
                  {trends[0]?.max && (
                    <Line
                      type="monotone"
                      dataKey="max"
                      stroke="#4caf50"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Max Price"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* No Data State */}
        {!showPrices && (
          <div className="initial-state">
            <div className="initial-icon">💰</div>
            <h3>Get Real Agmarknet Prices</h3>
            <p>Select your State, District, and Commodity to view current market prices</p>
            <p className="info-text">
              ✅ Real prices from Agmarknet Government API
            </p>
          </div>
        )}

        {/* No Prices Found */}
        {showPrices && prices.length === 0 && (
          <div className="no-data">
            <p>⚠️ No prices available for this selection</p>
            <p className="info-text">Try a different commodity or location</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPrices;
