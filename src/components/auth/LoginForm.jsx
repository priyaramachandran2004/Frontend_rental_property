// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
 
// const LoginPage = ({ userType }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
 
//   const handleLogin = async () => {
//     try {
//       const endpoint =
//         userType === "Owner"
//           ? `http://localhost:8082/api/owners/login/${email}`
//           : `http://localhost:8083/api/tenants/login/${email}`;
 
//       const response = await axios.get(endpoint);
 
//       if (response.data.email === email && response.data.password === password) {
//         // Redirect user based on type and pass tenant ID
//         if (userType === "Owner") {
//           navigate(`/owner-dashboard/${response.data.ownerId}`); // Navigate to Owner Dashboard
//         } else {
//           navigate(`/tenant-dashboard/${response.data.tenantId}`); // Navigate to Tenant Dashboard with tenant ID
//         }
//       } else {
//         setError("Invalid credentials");
//       }
//     } catch (err) {
//       setError("User not found");
//     }
//   };
 
//   return (
//     <div className="auth-container">
//       <h4>{userType} Login</h4>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button onClick={handleLogin}>Login</button>
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };
 
// export default LoginPage;
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
          sessionStorage.setItem('ownerId', response.data.ownerId.toString());
          navigate(`/owner-dashboard/${response.data.ownerId}`);
        } else {
          const tenantId = response.data.tenantId.toString();
          console.log("Storing tenantId:", tenantId);
          sessionStorage.setItem('tenantId', tenantId);
          navigate('/tenant-dashboard');
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("User not found");
    }
  };

  return (
    <div className="form-container">
      <h4>{userType} Login</h4>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin} className="submit-button">Login</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginForm;