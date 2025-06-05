import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, Grid, CircularProgress, Dialog, DialogTitle, 
    DialogContent, DialogActions, Button, TextField } from "@mui/material";
  import { FaEdit, FaTrash } from "react-icons/fa";
  import "./MyProperties.css";

const MyProperties = ({ ownerId }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editFormData, setEditFormData] = useState({
    address: "",
    description: "",
    rentAmount: "",
  });
  const imagePaths = [
    "/images/prop1.jpg",
    "/images/prop2.jpg",
    "/images/prop3.jpg",
    "/images/prop4.jpg",
    "/images/prop5.jpg",
  ];
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`http://localhost:8084/api/properties/owner/${ownerId}`);
      const propertiesWithImages = response.data.map((property, index) => ({
        ...property,
        photo: imagePaths[index % imagePaths.length],
      }));
      setProperties(propertiesWithImages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/api/properties/owner/${ownerId}`);
        const propertiesWithImages = response.data.map((property, index) => ({
          ...property,
          photo: imagePaths[index % imagePaths.length],
        }));
        setProperties(propertiesWithImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [ownerId]);
  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`http://localhost:8084/api/properties/${propertyId}`);
        fetchProperties(); // Refresh the properties list
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };
 

  useEffect(() => {
    fetchProperties();
  }, [ownerId]);

  const handleEdit = (property) => {
    setSelectedProperty(property);
    setEditFormData({
      address: property.address,
      description: property.description,
      rentAmount: property.rentAmount,
    });
    setEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      const updatedProperty = {
        ...selectedProperty,
        ...editFormData,
      };

      await axios.put(
        `http://localhost:8084/api/properties/${selectedProperty.propertyId}`,
        updatedProperty
      );

      setEditDialog(false);
      fetchProperties(); // Refresh the properties list
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  
  return (
    <div className="properties-container">
      <Typography variant="h4" gutterBottom className="properties-title">
        My Properties
      </Typography>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : properties.length === 0 ? (
        <Typography variant="h6" className="no-properties">
          You haven't added any properties yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.propertyId}>
              <Card className="property-card">
                <div className="property-image">
                  <img src={property.photo} alt={property.description} />
                  <div className="property-status">
                    {property.availabilityStatus ? "Available" : "Leased"}
                  </div>
                </div>
                <div className="property-details">
                  <Typography variant="h6">{property.description}</Typography>
                  <Typography>📍 {property.address}</Typography>
                  <Typography>💰 ₹{property.rentAmount}/month</Typography>
                  
                  {property.availabilityStatus && (
                    <div className="property-actions">
                      <button 
                        className="edit-button"
                        onClick={() => handleEdit(property)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button 
                        className="delete-button"
                        onClick={() => handleDelete(property.propertyId)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Address"
            value={editFormData.address}
            onChange={(e) => setEditFormData({...editFormData, address: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={editFormData.description}
            onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Rent Amount"
            type="number"
            value={editFormData.rentAmount}
            onChange={(e) => setEditFormData({...editFormData, rentAmount: e.target.value})}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyProperties;