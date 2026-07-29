
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

function Auth({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    userType: 'FARMER',
  });

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!loginData.email || !loginData.password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    const result = await login(loginData.email, loginData.password);

    if (result.success) {
      setSuccess('Login successful! Redirecting...');
      setIsAuthenticated(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!registerData.username || !registerData.email || !registerData.password) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await register(registerData);

    if (result.success) {
      setSuccess('Registration successful! Now login with your credentials.');
      setTimeout(() => {
        setIsLogin(true);
        setRegisterData({
          username: '',
          email: '',
          password: '',
          fullName: '',
          phoneNumber: '',
          userType: 'FARMER',
        });
      }, 2000);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>👨🏻‍🌾 KrishiMitra</h1>
          <p>{isLogin ? 'Farmer Assistant Platform' : 'Join Our Community'}</p>
        </div>

        {/* Error message */}
        {error && <div className="auth-error">{error}</div>}

        {/* Success message */}
        {success && <div className="auth-success">{success}</div>}

        {/* LOGIN FORM */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Login</h2>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                disabled={loading}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="auth-toggle">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setSuccess('');
                }}
              >
                Register here
              </button>
            </p>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegister} className="auth-form">
            <h2>Create Account</h2>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your full name"
                value={registerData.fullName}
                onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="9876543210"
                value={registerData.phoneNumber}
                onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>User Type</label>
              <select
                value={registerData.userType}
                onChange={(e) => setRegisterData({ ...registerData, userType: e.target.value })}
                disabled={loading}
              >
                <option value="FARMER">Farmer</option>
                <option value="ADMIN">Admin</option>
                <option value="EXTENSION_OFFICER">Extension Officer</option>
              </select>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </button>

            <p className="auth-toggle">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setSuccess('');
                }}
              >
                Login here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
