import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddProperty = () => {
  const { id: ownerId } = useParams(); // Get ownerId from route parameters
  const [formData, setFormData] = useState({
    name: "",
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
        ownerId: parseInt(ownerId), // Automatically include ownerId
        name: formData.name, // Include name field
        address: formData.address,
        rentAmount: parseFloat(formData.amountPerMonth), // Map amountPerMonth to rentAmount
        description: formData.description,
      };

      const response = await axios.post("http://localhost:8084/api/properties", propertyData);
      console.log("Property Submitted:", response.data);
      setSuccessMessage("Property added successfully!");
      setFormData({
        name: "",
        address: "",
        amountPerMonth: "",
        description: "",
      }); // Reset form after successful submission
    } catch (error) {
      console.error("Error adding property:", error);
      setErrorMessage("Failed to add property. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h3>Add New Property</h3>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amountPerMonth"
          placeholder="Amount per Month"
          value={formData.amountPerMonth}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProperty;