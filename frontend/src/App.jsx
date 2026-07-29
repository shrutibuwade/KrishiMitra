
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/HomeDashboard';
import CropsPageNew from './pages/CropsPageNew';
import Weather from './pages/Weather';
import MarketPrices from './pages/MarketPrices';
import Recommendations from './pages/Recommendations';
import Schemes from './pages/GovernmentSchemes';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Chatbot from './components/Chatbot';
import CropDetail from './pages/CropDetail';
import Community from './pages/Community';
import PostDetail from './pages/PostDetail';

import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        
        {/* Landing Page - NO navbar */}
        

        {/* Auth Pages - NO navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route 
  path="/" 
  element={<Navigate to="/home" replace />} 
/>

        {/* ========== PROTECTED ROUTES (Login required + Navbar) ========== */}

        {/* Home Dashboard */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Crops Page */}
        <Route
          path="/crops"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <CropsPageNew />
            </ProtectedRoute>
          }
        />

        {/* Crop Detail */}
        <Route
          path="/crops/:id"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <CropDetail />
            </ProtectedRoute>
          }
        />

        {/* Weather Page */}
        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <Weather />
            </ProtectedRoute>
          }
        />

        {/* Market Prices Page */}
        <Route
          path="/market-prices"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <MarketPrices />
            </ProtectedRoute>
          }
        />

        {/* Recommendations Page */}
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <Recommendations />
            </ProtectedRoute>
          }
        />

        {/* Schemes Page */}
        <Route
          path="/schemes"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <Schemes />
            </ProtectedRoute>
          }
        />

        {/* Community Page */}
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <Community />
            </ProtectedRoute>
          }
        />

        {/* Post Detail */}
        <Route
          path="/community/post/:postId"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <PostDetail />
            </ProtectedRoute>
          }
        />

        {/* Profile Page */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Navbar />
              <Chatbot />
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ========== 404 - Page Not Found ========== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;