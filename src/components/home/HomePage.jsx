import React from 'react';
import Navbar from '../common/Navbar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="hero-section">
        <h1>Welcome to Rental Property Management</h1>
        <p>Manage your properties, leases, and payments all in one place.</p>
      </div>
    </div>
  );
};

export default HomePage;
