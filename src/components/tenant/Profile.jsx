import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaKey, FaSave, FaTimes } from "react-icons/fa";
const Profile = ({ tenantId }) => {
  const [tenant, setTenant] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Track password change state
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8083/api/tenants/${tenantId}`) // Use tenantId dynamically
      .then((response) => {
        setTenant(response.data);
        setEditData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
        }); // Exclude password from editData
      })
      .catch((error) => console.error("Error fetching tenant:", error));
  }, [tenantId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSubmit = () => {
    const updatedTenant = { ...tenant, ...editData }; // Merge editData with tenant to preserve password
    axios
      .put(`http://localhost:8083/api/tenants/${tenant.tenantId}`, updatedTenant)
      .then((response) => {
        setTenant(response.data);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating tenant:", error));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordChange({ ...passwordChange, [name]: value });
  };

  const handlePasswordSubmit = () => {
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    if (passwordChange.oldPassword !== tenant.password) {
      alert("Old password is incorrect!");
      return;
    }

    const updatedTenant = { ...tenant, password: passwordChange.newPassword };

    axios
      .put(`http://localhost:8083/api/tenants/${tenant.tenantId}`, updatedTenant)
      .then((response) => {
        alert("Password updated successfully!");
        setTenant(response.data);
        setPasswordChange({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setIsChangingPassword(false); // Exit password change mode
      })
      .catch((error) => console.error("Error updating password:", error));
  };

  const handlePasswordToggle = () => {
    setIsChangingPassword(!isChangingPassword); // Toggle password change mode
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
      </div>

      {tenant ? (
        <div className="profile-content">
          <div className="profile-section">
            <div className="profile-info">
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="text"
                      name="phone"
                      value={editData.phone}
                      onChange={handleEditChange}
                      className="form-input"
                    />
                  </div>
                  <div className="button-group">
                    <button onClick={handleEditSubmit} className="save-btn">
                      <FaSave /> Save
                    </button>
                    <button onClick={handleEditToggle} className="cancel-btn">
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-display">
                  <div className="info-item">
                    <span className="info-label">Name</span>
                    <span className="info-value">{tenant.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{tenant.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{tenant.phone}</span>
                  </div>
                  <button onClick={handleEditToggle} className="edit-btn">
                    <FaEdit /> Edit Profile
                  </button>
                </div>
              )}
            </div>

            <div className="password-section">
              <h3>Security Settings</h3>
              {isChangingPassword ? (
                <div className="password-form">
                  <div className="form-group">
                    <label>Current Password:</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordChange.oldPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password:</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordChange.newPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordChange.confirmPassword}
                      onChange={handlePasswordChange}
                      className="form-input"
                    />
                  </div>
                  <div className="button-group">
                    <button onClick={handlePasswordSubmit} className="save-btn">
                      <FaSave /> Update Password
                    </button>
                    <button onClick={handlePasswordToggle} className="cancel-btn">
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={handlePasswordToggle} className="change-password-btn">
                  <FaKey /> Change Password
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">
          <div className="loader"></div>
          <p>Loading profile...</p>
        </div>
      )}
    </div>
  );
};

export default Profile;