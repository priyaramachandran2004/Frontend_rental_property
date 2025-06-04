import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "./Profile";
import History from "./History";
import PropertyList from "../property/PropertyList"; // Import Property component
import { FaUser, FaHistory, FaSignOutAlt, FaHome } from "react-icons/fa"; // Add FaHome for Properties icon
import "./Tenant.css";

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState("properties"); // Default tab is Properties
  const navigate = useNavigate();
  const { id } = useParams(); // Get tenant ID from route parameters

  const handleSignOut = () => {
    navigate("/auth"); // Redirect to login page
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2>Tenant Dashboard</h2>
        <button onClick={() => setActiveTab("profile")}><FaUser /> Profile</button>
        <button onClick={() => setActiveTab("history")}><FaHistory /> History</button>
        <button onClick={() => setActiveTab("properties")}><FaHome /> Properties</button> {/* Add Properties button */}
        <button onClick={handleSignOut}><FaSignOutAlt /> Sign Out</button>
      </nav>

      <div className="content">
        {activeTab === "profile" && <Profile tenantId={id} />} {/* Pass tenant ID to Profile */}
        {activeTab === "history" && <History />} {/* Show History when clicked */}
        {activeTab === "properties" && <PropertyList />} {/* Show Properties by default and when clicked */}
      </div>
    </div>
  );
};

export default TenantDashboard;