import React from 'react';
import Navbar from '../common/Navbar';
import './AboutPage.css';
 

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-content">
        <div className="about-image">
          <img src="\about.png" alt="About" />
        </div>
        <div className="about-text">
          <h2>About Our Rental Property Management System</h2>
          <p>
            Our platform simplifies rental property management for both owners and tenants. Owners can list properties, manage leases, and track payments. Tenants can browse listings, request leases, and make payments—all in one place.
          </p>
          <p>
            Built with modern technologies like React and Spring Boot, our system ensures a smooth and secure experience for all users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;