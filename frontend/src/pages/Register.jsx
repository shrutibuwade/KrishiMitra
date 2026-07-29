import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    state: 'Madhya Pradesh',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const validateForm = () => {
    if (!formData.username.trim()) return 'Username is required';
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.includes('@')) return 'Valid email required';
    if (!formData.phone || formData.phone.length !== 10) return '10-digit phone required';
    if (!formData.state) return 'State is required';
    if (formData.password.length < 6) return 'Password must be 6+ characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // ✅ SEND ALL REQUIRED FIELDS TO BACKEND
      const payload = {
        username: formData.username.trim(),      // ✅ username = name
        name: formData.name.trim(),          // ✅ name
        email: formData.email.trim(),
        password: formData.password,
        state: formData.state,
        phoneNumber: formData.phone,         // ✅ phone number
        fullName: formData.name.trim(),      // ✅ full name
        userType: 'FARMER'                   // ✅ default type
      };
      
      console.log('📤 Sending payload:', payload);
      
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response Data:', data);

      if (response.ok) {
        console.log('✅ Registration successful!');
        setSuccess(true);
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorMsg = data.message || data.error || 'Registration failed';
        console.error('❌ Error:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError('Connection failed. Please check internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  // ========== SUCCESS SCREEN ==========
  if (success) {
    return (
      <div className="register-container">
        <div className="register-box">
          <div className="register-success">
            <h2>✅ Registration Successful!</h2>
            <p>Your account has been created.</p>
            <p>Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  // ========== REGISTER FORM ==========
  return (
    <div className="auth-page">
      {/* LEFT HERO */}
      <div className="auth-hero">
        <div className="hero-overlay"></div>
        <img 
          src="/images/register.jpg" 
          alt="Farm" 
          className="hero-image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="hero-content-minimal">
          <div className="hero-logo-minimal">
            <div className="logo-circle">👨‍🌾</div>
            <h1>KrishiMitra</h1>
          </div>
          <p className="hero-tagline-minimal">Empower Farmers, Grow Together</p>
          <div className="decorative-line"></div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="auth-form-section register-section">
        <div className="form-container">
          <div className="form-header">
            <div className="form-icon">👩‍🌾</div>
            <h2>Create Your Account</h2>
            <p>Join thousands of successful farmers</p>
          </div>

          {error && (
            <div className="form-error">
              <span>⚠️</span>
              {error}
              <button className="error-close" onClick={() => setError('')}>×</button>
            </div>
          )}

          <form onSubmit={handleRegister} className="auth-form">
            {/* USERNAME */}
<div className="form-group">
  <label htmlFor="username">👤 Username</label>
  <input
    type="text"
    id="username"
    name="username"
    value={formData.username}
    onChange={handleChange}
    placeholder="Choose a username"
    className="form-input"
    required
  />
</div>

            {/* NAME */}
            <div className="form-group">
              <label htmlFor="name">👤 Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="form-input"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">📧 Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="form-input"
                required
              />
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label htmlFor="phone">📱 Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength="10"
                className="form-input"
                required
              />
            </div>

            {/* STATE */}
            <div className="form-group">
              <label htmlFor="state">📍 State</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-input"
                required
              >
                {indianStates.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">🔐 Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="form-input"
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label htmlFor="confirmPassword">🔐 Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="form-input"
                required
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>⏳ Creating account...</>
              ) : (
                <>✨ Create Account</>
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="form-footer">
            <p>
              Already have an account?{' '}
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

export default Register;