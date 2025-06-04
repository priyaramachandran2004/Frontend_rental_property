import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const endpoint = userType === "Owner"
        ? `http://localhost:8082/api/owners/login/${email}`
        : `http://localhost:8083/api/tenants/login/${email}`;

      const response = await axios.get(endpoint);

      if (response.data.email === email && response.data.password === password) {
        if (userType === "Owner") {
          navigate(`/owner-dashboard/${response.data.ownerId}`);
        } else {
          navigate(`/tenant-dashboard/${response.data.tenantId}`);
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("User not found");
    }
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label className="input-label">Email</label>
        <input
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="input-label">Password</label>
        <input
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="submit-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;