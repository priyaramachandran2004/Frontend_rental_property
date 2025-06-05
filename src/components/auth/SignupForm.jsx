import React, { useState } from 'react';
import axios from 'axios';
 
const SignUpPage = ({ userType }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: ''
  });
  const [error, setError] = useState('');
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };
 
  const handleSignup = async () => {
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      return;
    }
 
    const endpoint = userType === 'Owner' ? 'http://localhost:8082/api/owners' : 'http://localhost:8083/api/tenants';
 
    try {
      await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" }
      });
 
      alert(`${userType} registered successfully`);
    } catch (err) {
      setError('user alredy exists'); // Show proper error message
    }
  };
 
  return (
    <div className="auth-container">
      <h4>{userType} Signup</h4>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <p className="error-message">{error}</p>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};
 
export default SignUpPage;