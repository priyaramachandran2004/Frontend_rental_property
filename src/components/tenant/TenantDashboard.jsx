import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import History from "./History";
import { FaUser, FaHistory, FaSignOutAlt } from "react-icons/fa";
import "./Tenant.css";

const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState(null); // ✅ Nothing displayed by default
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/auth"); // ✅ Redirect to login page
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2>Tenant Dashboard</h2>
        <button onClick={() => setActiveTab("profile")}><FaUser /> Profile</button>
        <button onClick={() => setActiveTab("history")}><FaHistory /> History</button>
        <button onClick={handleSignOut}><FaSignOutAlt /> Sign Out</button>
      </nav>

      <div className="content">
        {activeTab === "profile" && <Profile />}   {/* ✅ Show Profile when clicked */}
        {activeTab === "history" && <History />}   {/* ✅ Show History when clicked */}
      </div>
    </div>
  );
};

export default TenantDashboard;
