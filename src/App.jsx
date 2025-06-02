// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/auth/AuthPage';
import HomePage from './components/home/HomePage';
import AboutPage from './components/home/AboutPage';
import TenantDashboard from './components/tenant/TenantDashboard';
// import OwnerDashboard from './components/owner/OwnerDashboard';
// import TenantDashboard from './components/tenant/TenantDashboard';
// import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} /> {/* ✅ Add this */}
  <Route path="/auth" element={<AuthPage />} />
<Route path="/tenant-dashboard" element={<TenantDashboard />}/>

        {/* <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
