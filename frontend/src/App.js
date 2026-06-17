import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';
import './App.css';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
); // <-- FIX: was missing closing );

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="App">
      {token && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
      <Routes>
        <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <StudentDashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
