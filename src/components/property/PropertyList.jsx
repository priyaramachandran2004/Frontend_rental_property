import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, Grid, CircularProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./Property.css"; // Import the CSS file

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  // Array of image paths in the public/images folder
  const imagePaths = [
    "/images/prop1.jpg",
    "/images/prop2.jpg",
    "/images/prop3.jpg",
    "/images/prop4.jpg",
    "/images/prop5.jpg",
  ];

  useEffect(() => {
    axios.get("http://localhost:8084/api/properties")
      .then(response => {
        // Assign images cyclically using modular arithmetic
        const updatedProperties = response.data.map((property, index) => ({
          ...property,
          photo: imagePaths[index % imagePaths.length], // Cycle through images
        }));
        setProperties(updatedProperties);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);

  const handleBuyClick = (propertyId) => {
    navigate(`/lease/${propertyId}`); // Navigate to the Lease component with the property ID
  };

  return (
    <div className="styled-container">
      <Typography variant="h4" gutterBottom color="primary">
        🏡 Hurry up to make lease.....
      </Typography>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {properties.map((property, index) => (
            <Grid item key={index}>
              <Card className="styled-card">
                {/* Image Section */}
                <div className="image-container">
                  <img
                    src={property.photo || "/images/default.jpg"} // Fallback to default photo if no photo is provided
                    alt="Property"
                    className="property-photo"
                  />
                </div>
                {/* Content Section */}
                <div className="content-container">
                  <Typography variant="h6" className="property-title">
                    {property.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    📍 Address: {property.address}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    💰 Rent: ₹{property.rentAmount}/month
                  </Typography>
                </div>
                {/* Button Section */}
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBuyClick(property.id)} // Pass property ID to the Lease component
                    className="buy-button"
                  >
                    Buy
                  </Button>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default PropertyList;