import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  // ✅ GET BOTH t AND i18n
  const { t, i18n } = useTranslation();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLanguageChange = (lang) => {
    console.log('Changing to:', lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="navbar-logo" onClick={handleNavClick}>
          <span className="logo-icon">👨‍🌾</span>
          <span className="logo-text">KrishiMitra</span>
        </Link>

        {/* Hamburger Menu Icon */}
        <div 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/home" className="nav-link" onClick={handleNavClick}>
            {t('Home')}
          </Link>
          <Link to="/crops" className="nav-link" onClick={handleNavClick}>
            {t('Crops')}
          </Link>
          <Link to="/weather" className="nav-link" onClick={handleNavClick}>
            {t('Weather')}
          </Link>
          <Link to="/market-prices" className="nav-link" onClick={handleNavClick}>
            {t('Prices')}
          </Link>
          <Link to="/recommendations" className="nav-link" onClick={handleNavClick}>
            {t('Recommendations')}
          </Link>
          <Link to="/schemes" className="nav-link" onClick={handleNavClick}>
            {t('Schemes')}
          </Link>
          <Link to="/community" className="nav-link" onClick={handleNavClick}>
            {t('Community')}
          </Link>
        </div>

        

        {/* Auth Section */}
        <div className="nav-auth">
          <Link to="/profile" className="nav-btn profile-btn" onClick={handleNavClick}>
            👤 {t('Profile')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;