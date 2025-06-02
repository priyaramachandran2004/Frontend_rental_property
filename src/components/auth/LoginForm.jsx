import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
const handleLogin = async () => {
  
  
  try {
    const endpoint = userType === "Owner"
      ? `http://localhost:8082/api/owners/${email}`
      : `http://localhost:8083/api/tenants/login/${email}`;

    const response = await axios.get(endpoint);

    if (response.data.email === email && response.data.password === password) {
      // Redirect user based on type
      if (userType === "Owner") {
        navigate("/owner-dashboard"); // Navigate to Owner Dashboard
      } else {
        navigate("/tenant-dashboard"); // Navigate to Tenant Dashboard
      }
    } else {
      setError("Invalid credentials");
    }
  } catch (err) {
    setError("User not found");
  }
};

  

  return (
    <div className="auth-container">
      <h4>{userType} Login</h4>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;
