// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Profile from "./Profile";
// import History from "./History";
// import PropertyList from "../property/PropertyList"; // Import Property component
// import { FaUser, FaHistory, FaSignOutAlt, FaHome } from "react-icons/fa"; // Add FaHome for Properties icon
// import "./Tenant.css";

// const TenantDashboard = () => {
//   const [activeTab, setActiveTab] = useState("properties"); // Default tab is Properties
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get tenant ID from route parameters

//   const handleSignOut = () => {
//     navigate("/auth"); // Redirect to login page
//   };

//   return (
//     <div className="dashboard">
//       <nav className="sidebar">
//         <h2>Tenant Dashboard</h2>
//         <button onClick={() => setActiveTab("profile")}><FaUser /> Profile</button>
//         <button onClick={() => setActiveTab("history")}><FaHistory /> History</button>
//         <button onClick={() => setActiveTab("properties")}><FaHome /> Properties</button> {/* Add Properties button */}
//         <button onClick={handleSignOut}><FaSignOutAlt /> Sign Out</button>
//       </nav>

//       <div className="content">
//         {activeTab === "profile" && <Profile tenantId={id} />} {/* Pass tenant ID to Profile */}
//         {activeTab === "history" && <History  tenantId={id}/>} {/* Show History when clicked */}
//         {activeTab === "properties" && <PropertyList tenantId={id}/>} {/* Show Properties by default and when clicked */}
//       </div>
//     </div>
//   );
// };

// export default TenantDashboard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import History from "./History";
import PropertyList from "../property/PropertyList";
import { FaUser, FaHistory, FaSignOutAlt, FaHome, FaBars } from "react-icons/fa";
import "./Tenant.css";

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const tenantId = sessionStorage.getItem('tenantId');
  
  useEffect(() => {
    if (!tenantId) {
      navigate('/auth');
    }
  }, [tenantId, navigate]);

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/auth");
  };

  if (!tenantId) {
    return null;
  }

  return (
    <div className="dashboard">
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
        
          <h2>Tenant Portal</h2>
          <button 
            className="toggle-button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          ><FaBars />
          </button>
            
        </div>
        <div className="nav-links">
          <button 
            className={activeTab === "profile" ? 'active' : ''} 
            onClick={() => setActiveTab("profile")}
          >
            <FaUser /> 
            <span>Profile</span>
          </button>
          <button 
            className={activeTab === "history" ? 'active' : ''} 
            onClick={() => setActiveTab("history")}
          >
            <FaHistory /> 
            <span>History</span>
          </button>
          <button 
            className={activeTab === "properties" ? 'active' : ''} 
            onClick={() => setActiveTab("properties")}
          >
            <FaHome /> 
            <span>Properties</span>
          </button>
        </div>
        <button className="sign-out-button" onClick={handleSignOut}>
          <FaSignOutAlt /> 
          <span>Sign Out</span>
        </button>
      </nav>

      <div className={`content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {activeTab === "profile" && <Profile tenantId={tenantId} />}
        {activeTab === "history" && <History tenantId={tenantId} />}
        {activeTab === "properties" && <PropertyList tenantId={tenantId} />}
      </div>
    </div>
  );
};

export default TenantDashboard;