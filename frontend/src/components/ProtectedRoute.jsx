import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if user is logged in by checking localStorage
  const user = localStorage.getItem('user');
  const isAuthenticated = !!user;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, show the page
  return children;
}

export default ProtectedRoute;
