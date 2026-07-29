import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CropDetail.css';
import cropsData from '../data/cropsData';

const CropDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const crop = cropsData.find(c => c.id === parseInt(id));

  if (!crop) {
    return (
      <div className="crop-detail-error">
        <h2>Crop not found</h2>
        <button onClick={() => navigate('/crops')}>← Back to Crops</button>
      </div>
    );
  }

  return (
    <div className="crop-detail-page">
      <button className="back-btn" onClick={() => navigate('/crops')}>← Back to All Crops</button>

      {/* HERO SECTION WITH TEXT */}
      <div className="detail-hero">
        <img src={crop.image} alt={crop.name} className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{crop.name}</h1>
            <p className="hero-hindi">{crop.hindi}</p>
          </div>
        </div>
      </div>

      <div className="detail-container">
        {/* QUICK INFO */}
        <section className="quick-info">
          <div className="info-card">
            <span className="icon">📅</span>
            <strong>Season</strong>
            <p>{crop.season}</p>
          </div>
          <div className="info-card">
            <span className="icon">⏱️</span>
            <strong>Duration</strong>
            <p>{crop.duration}</p>
          </div>
          <div className="info-card">
            <span className="icon">📊</span>
            <strong>Yield</strong>
            <p>{crop.yield}</p>
          </div>
          <div className="info-card">
            <span className="icon">📍</span>
            <strong>Region</strong>
            <p>{crop.region}</p>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="detail-section">
          <h2>📋 Overview</h2>
          <p className="description">{crop.description}</p>
          <div className="overview-grid">
            <div className="overview-box">
              <strong>🌱 Soil Requirements</strong>
              <p>{crop.soil}</p>
            </div>
            <div className="overview-box">
              <strong>☀️ Weather Conditions</strong>
              <p>{crop.weather}</p>
            </div>
          </div>
        </section>

        {/* IRRIGATION */}
        <section className="detail-section">
          <h2>💧 Irrigation & Water Management</h2>
          <div className="irrigation-grid">
            <div className="irrigation-box">
              <strong>💧 Irrigation Method</strong>
              <p>{crop.irrigation.method}</p>
            </div>
            <div className="irrigation-box">
              <strong>🔄 Frequency</strong>
              <p>{crop.irrigation.frequency}</p>
            </div>
            <div className="irrigation-box">
              <strong>📏 Water Required</strong>
              <p>{crop.irrigation.waterRequired}</p>
            </div>
            <div className="irrigation-box">
              <strong>⏰ Best Time</strong>
              <p>{crop.irrigation.bestTime}</p>
            </div>
          </div>

          <h3>📅 Irrigation Schedule</h3>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Crop Stage</th>
                <th>Days After Sowing</th>
                <th>Water Requirement</th>
              </tr>
            </thead>
            <tbody>
              {crop.irrigation.schedule.map((item, idx) => (
                <tr key={idx}>
                  <td><strong>{item.stage}</strong></td>
                  <td>{item.days}</td>
                  <td>{item.water}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* VARIETIES */}
        <section className="detail-section">
          <h2>🌾 Recommended Varieties</h2>
          <div className="varieties-grid">
            {crop.varieties.map((variety, idx) => (
              <div key={idx} className="variety-card">
                <h4>{variety.name}</h4>
                <div className="variety-info">
                  <div className="info-item">
                    <span className="label">Yield:</span>
                    <span className="value">{variety.yield}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Maturity:</span>
                    <span className="value">{variety.maturity}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Height:</span>
                    <span className="value">{variety.height}</span>
                  </div>
                </div>
                <p className="characteristics">{variety.characteristics}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FERTILIZER */}
        <section className="detail-section">
          <h2>🧪 Fertilizer Recommendation</h2>
          <div className="fertilizer-grid">
            <div className="fertilizer-box">
              <strong>Nitrogen (N)</strong>
              <p className="amount">{crop.fertilizer.nitrogen}</p>
            </div>
            <div className="fertilizer-box">
              <strong>Phosphorus (P)</strong>
              <p className="amount">{crop.fertilizer.phosphorus}</p>
            </div>
            <div className="fertilizer-box">
              <strong>Potassium (K)</strong>
              <p className="amount">{crop.fertilizer.potassium}</p>
            </div>
          </div>

          <h3>📅 Fertilizer Application Schedule</h3>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Nutrients to Apply</th>
              </tr>
            </thead>
            <tbody>
              {crop.fertilizer.schedule.map((item, idx) => (
                <tr key={idx}>
                  <td><strong>{item.stage}</strong></td>
                  <td>{item.nutrients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* PESTS & DISEASES */}
        <section className="detail-section">
          <h2>🐛 Pest & Disease Management</h2>
          <div className="pests-grid">
            {crop.pestsDiseases.map((item, idx) => (
              <div key={idx} className="pest-card">
                <div className="pest-header">
                  <strong>{item.name}</strong>
                  <span className={`badge ${item.type.toLowerCase()}`}>{item.type}</span>
                </div>
                <p><strong>Control:</strong> {item.control}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="detail-cta">
          <div className="cta-content">
            <h3>Still have questions?</h3>
            <p>Ask our Chatbot for more farming tips, pest management, market prices, and government schemes</p>
            <button className="chatbot-btn" onClick={() => window.scrollTo(0, 0)}>💬 Ask Chatbot</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CropDetail;