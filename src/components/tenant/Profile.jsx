import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8083/api/tenants/3") // Replace with dynamic ID
      .then(response => setTenant(response.data))
      .catch(error => console.error("Error fetching tenant:", error));
  }, []);

  return (
    <div className="profile">
      <h3>Tenant Profile</h3>
      {tenant ? (
        <div>
          <p><strong>Name:</strong> {tenant.name}</p>
          <p><strong>Email:</strong> {tenant.email}</p>
          <p><strong>Phone:</strong> {tenant.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
