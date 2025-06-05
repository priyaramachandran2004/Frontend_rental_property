// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { TextField, Button, Typography, CircularProgress } from "@mui/material";
// import "./Lease.css";

// const LeaseForm = () => {
//   const { propertyId, tenantId } = useParams(); // Retrieve property ID and tenant ID from URL
//   const navigate = useNavigate();

//   const [owner, setOwner] = useState(null);
//   const [tenant, setTenant] = useState(null);
//   const [property, setProperty] = useState(null);
//   const [leaseData, setLeaseData] = useState({
//     tenantId,
//     propertyId,
//     duration: "",
//     rentAmount: "",
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch property details
//         const propertyRes = await axios.get(`http://localhost:8084/api/properties/${propertyId}`);
//         setProperty(propertyRes.data);

//         // Fetch owner details
//         const ownerRes = await axios.get(`http://localhost:8082/api/owners/${propertyRes.data.ownerId}`);
//         setOwner(ownerRes.data);

//         // Fetch tenant details
//         const tenantRes = await axios.get(`http://localhost:8083/api/tenants/${tenantId}`);
//         setTenant(tenantRes.data);

//         // Set rent amount
//         setLeaseData((prev) => ({ ...prev, rentAmount: propertyRes.data.rentAmount }));
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching details:", error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [propertyId, tenantId]);

//   const handleChange = (e) => {
//     setLeaseData({ ...leaseData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const totalRentAmount = leaseData.rentAmount * leaseData.duration; // Calculate total rent
//       const leaseResponse = await axios.post("http://localhost:8085/api/leases", {
//         ...leaseData,
//         rentAmount: totalRentAmount,
//       });

//       alert("Lease Created Successfully!");
//       navigate(`/payment/${leaseResponse.data.leaseId}`, {
//         state: {
//           leaseId: leaseResponse.data.leaseId,
//           totalAmount: totalRentAmount,
//           owner,
//           tenant,
//           property,
//         },
//       }); // Pass all necessary details to Payment component
//     } catch (error) {
//       console.error("Error creating lease:", error);
//     }
//   };

//   return (
//     <div className="lease-form">
//       <Typography variant="h4">Lease Property</Typography>

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <div>
//           <Typography variant="h6">Owner Details:</Typography>
//           <Typography><strong>Name:</strong> {owner?.name}</Typography>
//           <Typography><strong>Email:</strong> {owner?.email}</Typography>
//           <Typography><strong>Phone:</strong> {owner?.phone}</Typography>

//           <Typography variant="h6">Tenant Details:</Typography>
//           <Typography><strong>Name:</strong> {tenant?.name}</Typography>
//           <Typography><strong>Email:</strong> {tenant?.email}</Typography>
//           <Typography><strong>Phone:</strong> {tenant?.phone}</Typography>

//           <Typography variant="h6">Property Details:</Typography>
//           <Typography><strong>Address:</strong> {property?.address}</Typography>
//           <Typography><strong>Rent Amount:</strong> ₹{property?.rentAmount}/month</Typography>

//           <form onSubmit={handleSubmit}>
//             <TextField
//               name="duration"
//               label="Lease Duration (months)"
//               variant="outlined"
//               value={leaseData.duration}
//               onChange={handleChange}
//               required
//               fullWidth
//             />
//             <TextField
//               name="rentAmount"
//               label="Total Rent Amount"
//               variant="outlined"
//               value={leaseData.rentAmount * leaseData.duration || ""}
//               InputProps={{ readOnly: true }}
//               fullWidth
//             />
//             <Button type="submit" variant="contained" color="primary">
//               Submit
//             </Button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaseForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Lease.css";

const LeaseForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { propertyId, tenantId } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [property, setProperty] = useState(null);
  const [leaseData, setLeaseData] = useState({
    propertyId: "",
    tenantId: "",
    duration: "",
    rentAmount: "",
  });

  useEffect(() => {
    if (!propertyId || !tenantId) {
      navigate('/tenant-dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        const propertyResponse = await axios.get(`http://localhost:8084/api/properties/${propertyId}`);
        const tenantResponse = await axios.get(`http://localhost:8083/api/tenants/${tenantId}`);
        const ownerResponse = await axios.get(`http://localhost:8082/api/owners/${propertyResponse.data.ownerId}`);

        setProperty(propertyResponse.data);
        setTenant(tenantResponse.data);
        setOwner(ownerResponse.data);

        setLeaseData({
          propertyId: propertyId,
          tenantId: tenantId,
          duration: "",
          rentAmount: propertyResponse.data.rentAmount,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyId, tenantId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const totalRentAmount = leaseData.rentAmount * leaseData.duration;
      
      // Create lease
      const leaseResponse = await axios.post("http://localhost:8085/api/leases", {
        ...leaseData,
        rentAmount: totalRentAmount,
      });

      // Update property availability
      await axios.put(`http://localhost:8084/api/properties/${propertyId}`, {
        ...property,
        availabilityStatus: false
      });

      navigate('/payment', {
        state: {
          leaseId: leaseResponse.data.leaseId,
          totalAmount: totalRentAmount,
          owner,
          tenant,
          property,
        },
      });
    } catch (error) {
      console.error("Error creating lease:", error);
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="lease-form">
      <h2>Create Lease Agreement</h2>
      
      <div className="details-section">
        <div className="details-card owner-details">
          <h3>Owner Details</h3>
          <div className="info-group">
            <span className="label">Name:</span>
            <span className="value">{owner.name}</span>
          </div>
          <div className="info-group">
            <span className="label">Email:</span>
            <span className="value">{owner.email}</span>
          </div>
          <div className="info-group">
            <span className="label">Phone:</span>
            <span className="value">{owner.phone}</span>
          </div>
        </div>

        <div className="details-card tenant-details">
          <h3>Tenant Details</h3>
          <div className="info-group">
            <span className="label">Name:</span>
            <span className="value">{tenant.name}</span>
          </div>
          <div className="info-group">
            <span className="label">Email:</span>
            <span className="value">{tenant.email}</span>
          </div>
          <div className="info-group">
            <span className="label">Phone:</span>
            <span className="value">{tenant.phone}</span>
          </div>
        </div>

        <div className="details-card property-details">
          <h3>Property Details</h3>
          <div className="info-group">
            <span className="label">Address:</span>
            <span className="value">{property.address}</span>
          </div>
          <div className="info-group">
            <span className="label">Monthly Rent:</span>
            <span className="value">₹{property.rentAmount}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="lease-duration-form">
        <div className="form-group">
          <label>Lease Duration (in months):</label>
          <input
            type="number"
            min="1"
            max="60"
            value={leaseData.duration}
            onChange={(e) => setLeaseData(prev => ({
              ...prev,
              duration: e.target.value
            }))}
            required
          />
        </div>
         
        {leaseData.duration && (
          <div className="total-amount">
            <span>Total Amount:</span>
            <span className="amount">₹{leaseData.rentAmount * leaseData.duration}</span>
          </div>
        )}
        
        <div className="button-group">
          <button type="submit" className="submit-button">
            Create Lease
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/tenant-dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaseForm;