import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import History from "./History";
import AddProperty from "./AddProperty";
import MyProperties from "./MyProperties";
import { FaUser, FaHistory, FaSignOutAlt, FaHome, FaBars, FaPlus } from "react-icons/fa";
import "./Owner.css";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const ownerId = sessionStorage.getItem('ownerId');
  
  useEffect(() => {
    if (!ownerId) {
      navigate('/auth');
    }
  }, [ownerId, navigate]);

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/auth");
  };

  if (!ownerId) {
    return null;
  }

  return (
    <div className="dashboard">
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div>
          <button 
            className="toggle-button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
          </div>
          <div>
          <h2>Owner Portal</h2>
          </div>
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
            className={activeTab === "properties" ? 'active' : ''} 
            onClick={() => setActiveTab("properties")}
          >
            <FaHome /> 
            <span>My Properties</span>
          </button>
          <button 
            className={activeTab === "add" ? 'active' : ''} 
            onClick={() => setActiveTab("add")}
          >
            <FaPlus /> 
            <span>Add Property</span>
          </button>
          <button 
            className={activeTab === "history" ? 'active' : ''} 
            onClick={() => setActiveTab("history")}
          >
            <FaHistory /> 
            <span>History</span>
          </button>
        </div>

        <button className="sign-out-button" onClick={handleSignOut}>
          <FaSignOutAlt /> 
          <span>Sign Out</span>
        </button>
      </nav>

      <div className={`content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
        {activeTab === "profile" && <Profile ownerId={ownerId} />}
        {activeTab === "properties" && <MyProperties ownerId={ownerId} />}
        {activeTab === "add" && <AddProperty ownerId={ownerId} />}
        {activeTab === "history" && <History ownerId={ownerId} />}
      </div>
    </div>
  );
};

export default OwnerDashboard;