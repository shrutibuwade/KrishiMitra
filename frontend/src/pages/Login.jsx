import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log('Response status:', response.status)
    console.log('Raw response:', data);

    if (response.ok) {
      // ✅ CORRECT TOKEN PATH
      let token = data.data?.token || null;
      
      console.log('Token extracted:', token);
      
      if (token) {
        localStorage.setItem('token', token);
        console.log('Token saved to localStorage:', token);
      } else {
        console.error('No token found in response');
        setError('Login failed - no token received');
        return;
      }

      // ✅ ALSO SAVE USER ID
      localStorage.setItem('user', JSON.stringify({
        id: data.data?.id,          // ✅ ADD ID
        email: data.data?.email || email,
        name: data.data?.username || email
      }));
      
      localStorage.setItem('userId', data.data?.id);  // ✅ ADD THIS

      console.log('User saved to localStorage');
      
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } else {
      setError(data.data?.message || 'Login failed');
    }
  } catch (err) {
    console.error('Error:', err);
    setError('Login failed. Please try again.');
  } finally {
    setLoading(false);
  } 
  }

  return (
    <div className="auth-page">
      {/* LEFT SIDE - CLEAN HERO SECTION */}
      <div className="auth-hero">
        <div className="hero-overlay"></div>
        <img 
          src="/images/hero-farm.jpg" 
          alt="Beautiful farm field" 
          className="hero-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        <div className="hero-content-minimal">
          {/* LOGO */}
          <div className="hero-logo-minimal">
            <div className="logo-circle">
              👨‍🌾
            </div>
            <h1>KrishiMitra</h1>
          </div>

          {/* TAGLINE */}
          <p className="hero-tagline-minimal">
            Empower Farmers, Grow Together
          </p>

          {/* DECORATIVE LINE */}
          <div className="decorative-line"></div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="auth-form-section">
        <div className="form-container">
          {/* HEADER */}
          <div className="form-header">
            <div className="form-icon">👨‍🌾</div>
            <h2>Login to KrishiMitra</h2>
            <p>Access your farming dashboard</p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="form-error">
              <span>⚠️</span>
              {error}
              <button className="error-close" onClick={() => setError('')}>×</button>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="auth-form">
            {/* EMAIL FIELD */}
            <div className="form-group">
              <label htmlFor="email">📧 Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@example.com"
                className="form-input"
              />
            </div>

            {/* PASSWORD FIELD */}
            <div className="form-group">
              <label htmlFor="password">🔐 Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Logging in...
                </>
              ) : (
                <>🚀 Login</>
              )}
            </button>
          </form>

          {/* REGISTER LINK */}
          <div className="form-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Register here
              </Link>
            </p>
          </div>

          {/* DEMO CREDENTIALS */}
          <div className="demo-info">
            <p>📝 Demo: test@example.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
