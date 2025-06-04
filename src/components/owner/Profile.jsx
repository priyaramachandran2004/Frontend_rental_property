import React, { useEffect, useState } from "react";
import axios from "axios";
 
const Profile = ({ ownerId }) => {
  const [owner, setOwner] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
 
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/owners/${ownerId}`)
      .then((response) => {
        setOwner(response.data);
        setEditData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
        });
      })
      .catch((error) => console.error("Error fetching owner:", error));
  }, [ownerId]);
 
  const handleEditToggle = () => setIsEditing(!isEditing);
 
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
 
  const handleEditSubmit = () => {
    const updatedOwner = { ...owner, ...editData };
    axios
      .put(`http://localhost:8082/api/owners/${owner.ownerId}`, updatedOwner)
      .then((response) => {
        setOwner(response.data);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating owner:", error));
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
 
    if (passwordChange.oldPassword !== owner.password) {
      alert("Old password is incorrect!");
      return;
    }
 
    const updatedOwner = { ...owner, password: passwordChange.newPassword };
 
    axios
      .put(`http://localhost:8082/api/owners/${owner.ownerId}`, updatedOwner)
      .then((response) => {
        alert("Password updated successfully!");
        setOwner(response.data);
        setPasswordChange({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setIsChangingPassword(false);
      })
      .catch((error) => console.error("Error updating password:", error));
  };
 
  const handlePasswordToggle = () => setIsChangingPassword(!isChangingPassword);
 
  return (
    <div className="profile">
      <h3>Owner Profile</h3>
      {owner ? (
        <div>
          {isEditing ? (
            <div>
              <label>
                Name:{" "}
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Email:{" "}
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Phone:{" "}
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                />
              </label>
              <button onClick={handleEditSubmit}>Save</button>
              <button onClick={handleEditToggle}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {owner.name}</p>
              <p><strong>Email:</strong> {owner.email}</p>
              <p><strong>Phone:</strong> {owner.phone}</p>
              <button onClick={handleEditToggle}>Edit</button>
            </div>
          )}
          <div className="password-change">
            <h4>Change Password</h4>
            {isChangingPassword ? (
              <div>
                <label>
                  Old Password:{" "}
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordChange.oldPassword}
                    onChange={handlePasswordChange}
                  />
                </label>
                <label>
                  New Password:{" "}
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordChange.newPassword}
                    onChange={handlePasswordChange}
                  />
                </label>
                <label>
                  Confirm Password:{" "}
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordChange.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </label>
                <button onClick={handlePasswordSubmit}>Save Password</button>
                <button onClick={handlePasswordToggle}>Cancel</button>
              </div>
            ) : (
              <button onClick={handlePasswordToggle}>Change Password</button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
 
export default Profile;