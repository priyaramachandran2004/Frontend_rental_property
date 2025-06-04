import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">🏠 Rental Management</Link>
      </div>
      
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>
            <FaHome /> <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            <FaInfoCircle /> <span>About</span>
          </Link>
        </li>
        <li>
          <Link to="/auth" onClick={() => setIsOpen(false)}>
            <FaSignInAlt /> <span>Login / Signup</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;