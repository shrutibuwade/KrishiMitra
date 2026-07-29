import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeDashboard.css';

const HomeDashboard = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Agriculture tips that change daily
  const dailyTips = [
    {
      title: 'Optimal Watering Time',
      description: 'Water your crops early in the morning (5-7 AM) to reduce water loss from evaporation and minimize disease risk.',
      icon: '💧',
      category: 'Irrigation'
    },
    {
      title: 'Soil Health Check',
      description: 'Test your soil pH and nutrient levels every 2-3 years. Healthy soil leads to 20-30% better crop yield.',
      icon: '🌱',
      category: 'Soil Care'
    },
    {
      title: 'Pest Management',
      description: 'Monitor crops for pests weekly. Early detection can prevent 50% crop loss. Use organic methods when possible.',
      icon: '🐛',
      category: 'Protection'
    },
    {
      title: 'Crop Rotation Benefits',
      description: 'Rotate crops annually to improve soil fertility and reduce pest buildup. This increases long-term yield by 15-25%.',
      icon: '🔄',
      category: 'Planning'
    },
    {
      title: 'Fertilizer Timing',
      description: 'Apply fertilizers during growth phase (V6-V8 for corn). Split applications reduce runoff and improve absorption.',
      icon: '🧪',
      category: 'Nutrition'
    },
    {
      title: 'Weather Monitoring',
      description: 'Check forecasts 3 days in advance to plan spraying, harvesting, and irrigation. Avoid operations before rain.',
      icon: '🌤️',
      category: 'Planning'
    }
  ];

  const successStories = [
    {
      name: 'Rajesh Kumar',
      district: 'Indore, MP',
      crop: 'Wheat',
      achievement: 'Increased yield by 35% in 2 years using KrishiMitra market insights',
      image: '👨‍🌾'
    },
    {
      name: 'Priya Sharma',
      district: 'Ludhiana, Punjab',
      crop: 'Rice',
      achievement: 'Saved ₹2 lakhs by avoiding unfavorable market prices through real-time alerts',
      image: '👩‍🌾'
    },
    {
      name: 'Vikram Singh',
      district: 'Faridabad, Haryana',
      crop: 'Vegetables',
      achievement: 'Connected with 50+ farmers through KrishiMitra community, increased profit by 40%',
      image: '👨‍🌾'
    },
    {
      name: 'Meera Patel',
      district: 'Ahmedabad, Gujarat',
      crop: 'Cotton',
      achievement: 'Applied personalized recommendations, got government subsidy worth ₹50,000',
      image: '👩‍🌾'
    }
  ];

  const quickActions = [
    {
      title: 'Check Market Prices',
      icon: '📊',
      description: 'Real-time commodity prices',
      link: '/market-prices',
      color: '#2d5016'
    },
    {
      title: 'Weather Forecast',
      icon: '🌤️',
      description: '7-day weather updates',
      link: '/weather',
      color: '#4ECDC4'
    },
    {
      title: 'Crop Guide',
      icon: '🌾',
      description: 'Complete crop information',
      link: '/crops',
      color: '#6b1963'
    },
    {
      title: 'Smart Tips',
      icon: '💡',
      description: 'Personalized recommendations',
      link: '/recommendations',
      color: '#FFA500'
    },
    {
      title: 'Gov. Schemes',
      icon: '📋',
      description: 'Subsidies & support programs',
      link: '/schemes',
      color: '#9B59B6'
    },
    {
      title: 'Community',
      icon: '👥',
      description: 'Connect with farmers',
      link: '/community',
      color: '#27AE60'
    }
  ];

  // Calculate today's tip based on date
const getTodaysTip = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const tipIndex = dayOfYear % dailyTips.length;
  return dailyTips[tipIndex];
};

const currentTip = getTodaysTip();

  const currentStory = successStories[currentStoryIndex];

  return (
    <div className="home-page" style={{ marginTop: '70px' }}>
      {/* ========== WELCOME SECTION ========== */}
      <section className="welcome-section">
  <video 
    autoPlay 
    muted 
    loop 
    playsInline
    className="hero-video"
  >
    <source src="/videos/farm-hero.mp4" type="video/mp4" />
  </video>
  
  <div className="welcome-overlay"></div>

   <div className="welcome-content">
    <h1>Welcome back,<br/>Farmer!</h1>
    <p>Your trusted partner for smart farming decisions.<br/>Get real-time insights, expert advice, and<br/>government support – all in one place.</p>
    
    <div className="welcome-buttons">
      <button 
        className="btn btn-primary" 
        onClick={() => window.location.href = '/schemes'}
      >
        Explore Schemes →
      </button>
      <button 
        className="btn btn-secondary" 
        onClick={() => window.location.href = '/market-prices'}
      >
        Check Crop Prices →
      </button>
    </div>
  </div>
</section>


     {/* ========== QUICK ACTIONS ========== */}
<section className="quick-actions-section">
  <div className="section-header">
    <h2>Quick Actions</h2>
    <p>Access your farming tools instantly</p>
  </div>

  <div className="quick-actions-carousel">
    <div className="carousel-track">
      {/* Original items */}
      {quickActions.map((action, index) => (
        <Link 
          key={index} 
          to={action.link} 
          className="quick-action-card"
          style={{ borderTopColor: action.color }}
        >
          <div className="action-icon" style={{ backgroundColor: `${action.color}20` }}>
            {action.icon}
          </div>
          <h3>{action.title}</h3>
          <p>{action.description}</p>
          <span className="action-arrow">→</span>
        </Link>
      ))}

      {/* Duplicate items for seamless loop */}
      {quickActions.map((action, index) => (
        <Link 
          key={`duplicate-${index}`} 
          to={action.link} 
          className="quick-action-card"
          style={{ borderTopColor: action.color }}
        >
          <div className="action-icon" style={{ backgroundColor: `${action.color}20` }}>
            {action.icon}
          </div>
          <h3>{action.title}</h3>
          <p>{action.description}</p>
          <span className="action-arrow">→</span>
        </Link>
      ))}
    </div>
  </div>
</section>

     {/* ========== DAILY TIP SECTION ========== */}
<section className="daily-tip-section">
  <div className="section-header">
    <h2>🌾 Today's Farming Tip</h2>
    <p>Expert advice that changes every day</p>
  </div>

  {/* Tip Card - No Navigation */}
  <div className="tip-card-wrapper">
    <div className="tip-card">
      <div className="tip-icon">{currentTip.icon}</div>
      <div className="tip-content">
        <span className="tip-category">{currentTip.category}</span>
        <h3>{currentTip.title}</h3>
        <p>{currentTip.description}</p>
        <div className="tip-footer">
          <span className="tip-date">Come back tomorrow for a new tip! 🌱</span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ========== SUCCESS STORY SECTION ========== */}
<section className="success-story-section">
  <div className="section-header">
    <h2>🌟 Farmer Success Stories</h2>
    <p>Inspiring transformations from farmers across India</p>
  </div>

  <div className="story-container">
    {/* Story Image */}
    <div className="story-image">
      {currentStory.image}
    </div>

    {/* Story Content */}
    <div className="story-card">
      <div className="story-header">
        <h3>{currentStory.name}</h3>
        <p className="story-location">📍 {currentStory.district}, {currentStory.state}</p>
      </div>

      <div className="story-details">
        <div className="detail-item">
          <span className="detail-icon">🌾</span>
          <div>
            <p className="detail-label">Growing</p>
            <p className="detail-value">{currentStory.crop}</p>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">📈</span>
          <div>
            <p className="detail-label">Yield Increase</p>
            <p className="detail-value">{currentStory.yield}</p>
          </div>
        </div>

        <div className="detail-item">
          <span className="detail-icon">⏱️</span>
          <div>
            <p className="detail-label">Since</p>
            <p className="detail-value">{currentStory.years}</p>
          </div>
        </div>
      </div>

      <div className="story-achievement">
        <p className="achievement-text">"{currentStory.achievement}"</p>
      </div>

      {/* Navigation Arrows */}
      <div className="story-nav">
        <button 
          className="story-arrow left"
          onClick={() => setCurrentStoryIndex((prev) => (prev - 1 + successStories.length) % successStories.length)}
        >
          ‹
        </button>
        <span className="story-counter">{currentStoryIndex + 1} / {successStories.length}</span>
        <button 
          className="story-arrow right"
          onClick={() => setCurrentStoryIndex((prev) => (prev + 1) % successStories.length)}
        >
          ›
        </button>
      </div>
    </div>
  </div>
</section>

{/* ========== STATS SECTION ========== */}
<section className="stats-section">
  <div className="section-header">
    <h2>📊 KrishiMitra Impact</h2>
    <p>Empowering farmers across India</p>
  </div>

  <div className="stats-grid">
    <div className="stat-card">
      <div className="stat-icon">👥</div>
      <div className="stat-content">
        <h3>Farmers Connected</h3>
        <p className="stat-number">50K+</p>
        <p className="stat-text">Growing community</p>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon">🌾</div>
      <div className="stat-content">
        <h3>Crops Tracked</h3>
        <p className="stat-number">60+</p>
        <p className="stat-text">Complete guides</p>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon">📡</div>
      <div className="stat-content">
        <h3>Market Updates</h3>
        <p className="stat-number">Real-time</p>
        <p className="stat-text">24/7 updates</p>
      </div>
    </div>

    <div className="stat-card">
      <div className="stat-icon">📈</div>
      <div className="stat-content">
        <h3>Avg. Yield↑</h3>
        <p className="stat-number">+28%</p>
        <p className="stat-text">Using KrishiMitra</p>
      </div>
    </div>
  </div>
</section>

{/* ========== CTA SECTION ========== */}
<section className="dashboard-cta-section">
  <div className="cta-content">
    <h2>Complete Your Profile</h2>
    <p>Get personalized recommendations based on your farm</p>
    <Link to="/profile" className="btn btn-primary btn-large">
      👤 Update Profile
    </Link>
  </div>
  <div className="cta-image">📋</div>
</section>

{/* ========== FOOTER ========== */}
<footer className="home-footer">
  <div className="footer-container">
    <div className="footer-section">
      <h4>🌾 KrishiMitra</h4>
      <p>Empowering Indian farmers with technology and real-time information for sustainable agriculture.</p>
      <div className="social-links">
        <a href="#" className="social-icon">📘</a>
        <a href="#" className="social-icon">🐦</a>
        <a href="#" className="social-icon">📷</a>
      </div>
    </div>
    
    <div className="footer-section">
      <h4>Quick Links</h4>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/crops">Crops</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/market-prices">Market Prices</Link></li>
        <li><Link to="/community">Community</Link></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Resources</h4>
      <ul>
        <li><a href="#/">Blog</a></li>
        <li><a href="#/">Guides</a></li>
        <li><a href="#/">FAQ</a></li>
        <li><a href="#/">Tutorials</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Support</h4>
      <p>📧 support@krishimitra.com</p>
      <p>📞 1800-FARMER-1</p>
      <p>⏰ Available 24/7</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2026 KrishiMitra. All rights reserved. | Made with 💚 for Indian Farmers</p>
  </div>
</footer>
    </div>
  );
};

export default HomeDashboard;
