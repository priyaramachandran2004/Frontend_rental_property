import React, { useState, useEffect } from 'react';
import { Typography, Card, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import './History.css';

const History = ({ ownerId }) => {
  const [leaseHistory, setLeaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaseHistory = async () => {
      try {
        // Get properties
        const propertiesResponse = await axios.get(
          `http://localhost:8084/api/properties/owner/${ownerId}`
        );

        const leasePromises = propertiesResponse.data.map(async (property) => {
          try {
            // Get leases for each property
            const leasesResponse = await axios.get(
              `http://localhost:8085/api/leases/property/${property.propertyId}`
            );

            // Get tenant and payment details for each lease
            const leasesWithDetails = await Promise.all(
              leasesResponse.data.map(async (lease) => {
                try {
                  // Fetch tenant and payment data in parallel
                  const [tenantResponse, paymentResponse] = await Promise.all([
                    axios.get(`http://localhost:8083/api/tenants/${lease.tenantId}`),
                    axios.get(`http://localhost:8086/api/payments/lease/${lease.leaseId}`)
                  ]);

                  // Process payment data
                  const paymentData = paymentResponse.data;
                  console.log('Payment data for lease', lease.leaseId, ':', paymentData);

                  return {
                    lease,
                    property,
                    tenant: tenantResponse.data,
                    payment: paymentData
                  };
                } catch (error) {
                  console.error(`Error fetching details for lease ${lease.leaseId}:`, error);
                  return {
                    lease,
                    property,
                    tenant: null,
                    payment: null
                  };
                }
              })
            );
            return leasesWithDetails;
          } catch (error) {
            console.error(`Error fetching leases for property ${property.propertyId}:`, error);
            return [];
          }
        });

        const allLeases = (await Promise.all(leasePromises)).flat();
        console.log('Final processed lease history:', allLeases);
        setLeaseHistory(allLeases);
      } catch (error) {
        console.error('Error fetching lease history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ownerId) {
      fetchLeaseHistory();
    }
  }, [ownerId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="properties-container">
      <Typography variant="h4" gutterBottom className="properties-title">
        Lease History
      </Typography>

      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : leaseHistory.length === 0 ? (
        <Typography variant="h6" className="no-properties">
          No lease history found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {leaseHistory.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.lease.leaseId}>
              <Card className="property-card">
                <div className="property-header">
                  <Typography variant="h6" className="property-title">
                    {item.property.description}
                  </Typography>
                </div>
                <div className="tenant-details">
                  {item.tenant && (
                    <div className="info-section">
                      <Typography variant="subtitle1" className="section-title">
                        Tenant Details
                      </Typography>
                      <Typography>👤 {item.tenant.name}</Typography>
                      <Typography>📧 {item.tenant.email}</Typography>
                      <Typography>📱 {item.tenant.phone}</Typography>
                    </div>
                  )}
                  
                  <div className="info-section">
                    <Typography variant="subtitle1" className="section-title">
                      Lease Details
                    </Typography>
                    <Typography>📅 Duration: {item.lease.duration} months</Typography>
                    <Typography>💰 Monthly Rent: ₹{item.property.rentAmount}</Typography>
                    <Typography>💵 Total Amount: ₹{item.lease.rentAmount}</Typography>
                  </div>

                  {item.payment && (
                    <div className="info-section">
                      <Typography variant="subtitle1" className="section-title">
                        Payment Details
                      </Typography>
                      <Typography>
                        🔖 Payment ID: {item.payment.paymentId || 'N/A'}
                      </Typography>
                      <Typography>
                        💳 Payment Mode: {item.payment.paymentMode || 'N/A'}
                      </Typography>
                      <Typography>
                        📆 Payment Date: {formatDate(item.payment.paymentDate)}
                      </Typography>
                      <Typography>
                        💰 Amount Paid: ₹{item.payment.amount || 'N/A'}
                      </Typography>
                    </div>
                  )}

                  <div className="info-section">
                    <Typography variant="subtitle1" className="section-title">
                      Property Location
                    </Typography>
                    <Typography>📍 {item.property.address}</Typography>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default History;