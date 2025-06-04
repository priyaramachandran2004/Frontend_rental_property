import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Navbar from '../common/Navbar';
import { motion } from 'framer-motion';
import './AuthPage.css';

const AuthPage = () => {
  const [userType, setUserType] = useState('Tenant');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="main-container">
      <Navbar />
      <div className="auth-wrapper">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="auth-container"
        >
          <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          
          <div className="form-group">
            <label className="input-label">Select User Type</label>
            <select 
              onChange={(e) => setUserType(e.target.value)}
              className="form-input"
            >
              <option value="Tenant">Tenant</option>
              <option value="Owner">Owner</option>
            </select>
          </div>

          {isLogin ? 
            <LoginForm userType={userType} /> : 
            <SignupForm userType={userType} />
          }

          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-button"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;