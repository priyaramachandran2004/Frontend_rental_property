import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle ,FaSignInAlt} from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">🏠 Rental Management</div>
      <ul className="nav-links">
        <li><Link to="/"><FaHome /> Home</Link></li>
        <li><Link to="/about"><FaInfoCircle /> About</Link></li>
        <li><Link to="/auth"><FaSignInAlt /> Login / Signup</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
