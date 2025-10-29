// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Leaves from './pages/Leaves';
import Resignation from './pages/Resignation';
import Replies from './pages/Replies';
import Dashboard from './pages/Dashboard';
import Resetpassword from "./Components/Resetpassword";
import Changepassword from "./Components/Changepassword";
import Leaveapproved from "./Leaves/Leaveapproved";
import Leavedeclined from "./Leaves/Leavedeclined";
import Approvedres from "./resignations/Approvedres";
import Declinedres from "./resignations/Declinedres"
import Tracing from './tracing/Tracing';


// Dummy auth check
const isAuthenticated = () => !!localStorage.getItem('accessToken');

// Protected route wrapper
const ProtectedRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<Resetpassword />} />


        {/* Protected dashboard layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Child routes render inside DashboardLayout using <Outlet /> */}
          <Route index element={<Replies />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="resignation" element={<Resignation />} />
          <Route path="change-password" element={<Changepassword />} />
          <Route path="leave-approved" element={<Leaveapproved />} />
          <Route path="leave-declined" element={<Leavedeclined />} />
          <Route path="approved-res" element={<Approvedres />} />
          <Route path="declined-res" element={<Declinedres />} />
          <Route path="trace-records" element={<Tracing />} />
        </Route>

        {/* Fallback: redirect to login or dashboard */}
        <Route
          path="*"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
