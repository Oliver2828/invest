import React from 'react';
import { Navigate } from 'react-router-dom';

// Usage: <ProtectedRoute><YourComponent /></ProtectedRoute>
// For admin-only routes: <ProtectedRoute adminOnly><AdminComponent/></ProtectedRoute>
export default function ProtectedRoute({ children, adminOnly = false }) {
  if (typeof window === 'undefined') return null;
  const email = localStorage.getItem('userEmail');
  const role = localStorage.getItem('userRole') || 'user';

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
}
