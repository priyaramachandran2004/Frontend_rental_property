import React, { useState } from "react";
import axios from "axios";
import "./AddProperty.css";

const AddProperty = () => {
  const ownerId = sessionStorage.getItem('ownerId');
  const [formData, setFormData] = useState({
    address: "",
    amountPerMonth: "",
    description: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const propertyData = {
        ownerId: parseInt(ownerId),
        address: formData.address,
        rentAmount: parseFloat(formData.amountPerMonth),
        description: formData.description,
        availabilityStatus: true
      };

      const response = await axios.post("http://localhost:8084/api/properties", propertyData);
      console.log("Property Submitted:", response.data);
      setSuccessMessage("Property added successfully!");
      setFormData({
        address: "",
        amountPerMonth: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding property:", error);
      setErrorMessage("Failed to add property. Please try again.");
    }
  };

  return (
    <div className="add-property-container">
      <h2 className="form-title">Add New Property</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label htmlFor="address">Property Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
            required
            placeholder="Enter complete property address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amountPerMonth">Monthly Rent Amount (₹)</label>
          <input
            type="number"
            id="amountPerMonth"
            name="amountPerMonth"
            value={formData.amountPerMonth}
            onChange={handleChange}
            className="form-input"
            required
            min="0"
            placeholder="Enter monthly rent amount"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Property Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            required
            rows="4"
            placeholder="Enter property details, features, etc."
          />
        </div>

        <button type="submit" className="submit-button">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;