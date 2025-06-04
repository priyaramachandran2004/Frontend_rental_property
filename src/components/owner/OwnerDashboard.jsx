import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddProperty from "./AddProperty";
import Profile from "./Profile";
import { FaPlus, FaUser, FaHistory, FaSignOutAlt } from "react-icons/fa";
import "./Owner.css";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ownerId from route parameters

  const handleSignOut = () => {
    navigate("/auth");
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <h2>Owner Dashboard</h2>
        <button onClick={() => setActiveTab("add")}><FaPlus /> Add Property</button>
        <button onClick={() => setActiveTab("profile")}><FaUser /> Profile</button>
        <button onClick={() => setActiveTab("history")}><FaHistory /> History</button>
        <button onClick={handleSignOut}><FaSignOutAlt /> Sign Out</button>
      </nav>

      <div className="content">
        {activeTab === "add" && <AddProperty />} {/* Pass ownerId automatically */}
        {activeTab === "profile" && <Profile ownerId={id} />}
        {activeTab === "history" && <History />}
      </div>
    </div>
  );
};

export default OwnerDashboard;