import React from 'react';
import Navbar from '../common/Navbar';
import { FaHome, FaKey, FaMoneyBillWave } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Rental Property Management</h1>
          <p>Manage your properties, leases, and payments all in one place.</p>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <FaHome className="feature-icon" />
          <h3>Property Management</h3>
          <p>Easily manage multiple properties with our intuitive dashboard.</p>
        </div>
        <div className="feature-card">
          <FaKey className="feature-icon" />
          <h3>Lease Tracking</h3>
          <p>Keep track of all your lease agreements in one central location.</p>
        </div>
        <div className="feature-card">
          <FaMoneyBillWave className="feature-icon" />
          <h3>Payment Processing</h3>
          <p>Streamline rent collection and payment processing.</p>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Rental Property Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;