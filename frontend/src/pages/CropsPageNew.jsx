import React, { useState } from 'react';
import '../styles/CropsPageNew.css';
import cropsData from '../data/cropsData';
import { useNavigate } from 'react-router-dom';


const CropsPageNew = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');

  const seasons = ['all', 'Rabi (Winter)', 'Kharif (Monsoon)', 'Summer', 'Annual', 'Perennial'];

  const filteredCrops = cropsData.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crop.hindi.includes(searchQuery);
    const matchesSeason = selectedSeason === 'all' || crop.season.includes(selectedSeason);
    return matchesSearch && matchesSeason;
  });

  return (
    <div className="crops-page-new">
      {/* HERO SECTION */}
      <section className="crops-hero">
        <h1> Crop Information & Management</h1>
      </section>

      {/* SEARCH & FILTER */}
      <div className="crops-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search crop by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          /> 
          <span className="search-icon">🔍</span> 
        </div>

        <div className="season-filter">
          {seasons.map(season => (
            <button
              key={season}
              className={`season-btn ${selectedSeason === season ? 'active' : ''}`}
              onClick={() => setSelectedSeason(season)}
            >
              {season === 'all' ? 'All Seasons' : season}
            </button>
          ))}
        </div>
      </div>

      {/* CROPS GRID */}
      <div className="crops-grid">
        {filteredCrops.length > 0 ? (
          filteredCrops.map(crop => (
            <div key={crop.id} className="crop-card">
              {/* IMAGE */}
              <div className="crop-image-container">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="crop-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="crop-image-placeholder">
                  <span style={{ fontSize: '48px' }}>{crop.icon}</span>
                  <p>Image coming soon</p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="crop-content">
                <div className="crop-header">
                  <div>
                    <h3>{crop.name}</h3>
                    <p className="hindi-name">{crop.hindi}</p>
                  </div>
                  <span className="crop-season">{crop.season}</span>
                </div>

                <div className="crop-details">
                  <div className="detail">
                    <span className="label">Duration:</span>
                    <span className="value">{crop.duration}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Yield:</span>
                    <span className="value">{crop.yield}</span>
                  </div>
                </div>

                <p className="crop-description">{crop.description}</p>

                <div className="crop-requirements">
                  <div className="requirement">
                    <strong>🌱 Soil:</strong> {crop.soil}
                  </div>
                  <div className="requirement">
                    <strong>☀️ Weather:</strong> {crop.weather}
                  </div>
                  <div className="requirement">
                    <strong>📍 Region:</strong> {crop.region}
                  </div>
                </div>

                <button 
  className="details-btn"
  onClick={() => navigate(`/crops/${crop.id}`)}
>
  View Full Details →
</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-crops">
            <p>No crops found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropsPageNew;