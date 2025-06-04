import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Navbar from '../common/Navbar';
import './AuthPage.css';
const AuthPage = () => {
  const [userType, setUserType] = useState('Tenant'); // or 'owner'
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
    <Navbar />
    <div className="auth-wrapper">
        <div className="auth-container">
       
      
      <select onChange={(e) => setUserType(e.target.value)}>
        <option value="Tenant">Tenant</option>
        <option value="Owner">Owner</option>
      </select>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
      {isLogin ? <LoginForm userType={userType} /> : <SignupForm userType={userType} />}
    </div> </div></>
  );
};

export default AuthPage;