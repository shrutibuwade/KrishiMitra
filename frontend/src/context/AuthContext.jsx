import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');

  const API_URL = 'http://localhost:8080/api';

  // Check if user is already logged in (on page refresh)
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Register new user
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return { success: true, message: data.message, user: data.data };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error: ' + error.message };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const loginData = data.data;
        
        // Save token and user to localStorage
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify({
          id: loginData.userId,
          username: loginData.username,
          email: loginData.email,
          fullName: loginData.fullName,
          userType: loginData.userType,
        }));

        // Update state
        setToken(loginData.token);
        setUser({
          id: loginData.userId,
          username: loginData.username,
          email: loginData.email,
          fullName: loginData.fullName,
          userType: loginData.userType,
        });
        setIsAuthenticated(true);

        return { success: true, message: 'Login successful' };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error: ' + error.message };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Get current user from backend
  const getCurrentUser = async () => {
    if (!token) return null;

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  };

  // Translations
  const t = (key) => {
    const translations = {
      en: {
        login: 'Login',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        username: 'Username',
        fullName: 'Full Name',
        phoneNumber: 'Phone Number',
        logout: 'Logout',
      },
      hi: {
        login: 'लॉगिन करें',
        register: 'पंजीकृत करें',
        email: 'ईमेल',
        password: 'पासवर्ड',
        username: 'उपयोगकर्ता नाम',
        fullName: 'पूरा नाम',
        phoneNumber: 'फोन नंबर',
        logout: 'लॉगआउट',
      },
      mr: {
        login: 'लॉगिन करा',
        register: 'नोंदणी करा',
        email: 'ईमेल',
        password: 'पासवर्ड',
        username: 'वापरकर्ता नाव',
        fullName: 'पूर्ण नाव',
        phoneNumber: 'फोन नंबर',
        logout: 'लॉगआउट',
      },
    };

    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const value = {
    isAuthenticated,
    user,
    token,
    loading,
    language,
    setLanguage,
    login,
    register,
    logout,
    getCurrentUser,
    t,
    API_URL,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
