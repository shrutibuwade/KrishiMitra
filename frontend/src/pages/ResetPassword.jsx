import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Get email from localStorage or redirect to forgot password
    const storedEmail = localStorage.getItem('reset_email');
    if (!storedEmail) {
      navigate('/forgot-password');
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      setTimeout(() => {
        // In real app, backend would update password in database
        // For now, we'll just clear the reset token and redirect to login
        
        localStorage.removeItem(`reset_token_${email}`);
        localStorage.removeItem('reset_email');

        setSuccess(true);

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);

        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to reset password. Please try again.');
      setLoading(false);
    }
  };

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

      {/* RIGHT SIDE - RESET PASSWORD FORM */}
      <div className="auth-form-section">
        <div className="form-container">
          {/* HEADER */}
          <div className="form-header">
            <div className="form-icon">✨</div>
            <h2>Create New Password</h2>
            <p>Set a strong password for your account</p>
          </div>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="form-success">
              <span>✅</span>
              Password reset successful! Redirecting to login...
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="form-error">
              <span>⚠️</span>
              {error}
              <button className="error-close" onClick={() => setError('')}>×</button>
            </div>
          )}

          {/* RESET PASSWORD FORM */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* EMAIL DISPLAY */}
            <div className="form-group">
              <label>📧 Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="form-input"
                style={{ backgroundColor: '#f5f5f0', color: '#999' }}
              />
            </div>

            {/* NEW PASSWORD FIELD */}
            <div className="form-group">
              <label htmlFor="password">🔐 New Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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
              <p className="form-hint">
                Use a mix of letters, numbers, and symbols for a strong password
              </p>
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <div className="form-group">
              <label htmlFor="confirmPassword">🔐 Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* PASSWORD STRENGTH INDICATOR */}
            <div className="password-strength">
              <div className="strength-bar">
                <div 
                  className={`strength-fill ${
                    password.length >= 8 ? 'strong' : 
                    password.length >= 6 ? 'medium' : 
                    'weak'
                  }`}
                  style={{
                    width: `${Math.min((password.length / 12) * 100, 100)}%`
                  }}
                ></div>
              </div>
              <p className="strength-text">
                {password.length === 0 ? 'Enter a password' :
                 password.length < 6 ? '❌ Too weak' :
                 password.length < 8 ? '⚠️ Medium' :
                 '✅ Strong'}
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading || password.length < 6}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Resetting...
                </>
              ) : (
                <>✨ Reset Password</>
              )}
            </button>
          </form>

          {/* BACK TO LOGIN LINK */}
          <div className="form-footer">
            <p>
              Remember your password?{' '}
              <Link to="/login" className="auth-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
