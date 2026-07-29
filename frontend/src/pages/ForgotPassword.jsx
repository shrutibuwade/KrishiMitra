import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Auth.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      setTimeout(() => {
        // Simulate sending reset email
        // In real app, backend would send email
        
        // Store reset token in localStorage (mock)
        const resetToken = Math.random().toString(36).substring(7);
        localStorage.setItem(`reset_token_${email}`, resetToken);
        localStorage.setItem('reset_email', email);

        setSuccess(true);

        // Redirect to reset password page after 2 seconds
        setTimeout(() => {
          navigate('/reset-password', { state: { email } });
        }, 2000);

        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
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

      {/* RIGHT SIDE - FORGOT PASSWORD FORM */}
      <div className="auth-form-section">
        <div className="form-container">
          {/* HEADER */}
          <div className="form-header">
            <div className="form-icon">🔐</div>
            <h2>Reset Password</h2>
            <p>Enter your email to receive reset instructions</p>
          </div>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="form-success">
              <span>✅</span>
              Check your email! Redirecting to reset page...
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

          {/* FORGOT PASSWORD FORM */}
          <form onSubmit={handleSubmit} className="auth-form">
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
              <p className="form-hint">
                We'll send a password reset link to your email
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>📧 Send Reset Email</>
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

          {/* INFO BOX */}
          <div className="info-box">
            <p>
              💡 <strong>Tip:</strong> Check your spam folder if you don't see the email in your inbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
