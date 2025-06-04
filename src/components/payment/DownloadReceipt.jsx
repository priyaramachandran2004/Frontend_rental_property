import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DownloadReceipt = ({ leaseId, totalAmount, paymentMode, owner, tenant, property }) => {
  const navigate = useNavigate(); // Initialize navigation

  const handleDownload = () => {
    const receiptContent = `
      Lease ID: ${leaseId}
      Tenant Details:
        Name: ${tenant.name}
        Email: ${tenant.email}
        Phone: ${tenant.phone}
      Owner Details:
        Name: ${owner.name}
        Email: ${owner.email}
        Phone: ${owner.phone}
      Property Details:
        Address: ${property.address}
        Rent Amount: ₹${property.rentAmount}/month
      Payment Details:
        Total Amount: ₹${totalAmount}
        Payment Mode: ${paymentMode}
        Payment Date: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "receipt.txt";
    link.click();

    // Redirect to TenantDashboard after downloading the receipt
    navigate(`/tenant-dashboard`);
  };

  return (
    <div>
      <Typography variant="h6">Payment Successful!</Typography>
      <Typography><strong>Lease ID:</strong> {leaseId}</Typography>
      <Typography><strong>Total Amount:</strong> ₹{totalAmount}</Typography>
      <Typography><strong>Payment Mode:</strong> {paymentMode}</Typography>
      <Typography><strong>Payment Date:</strong> {new Date().toLocaleDateString()}</Typography>
      <Button variant="contained" color="primary" onClick={handleDownload}>
        Download Receipt
      </Button>
    </div>
  );
};

export default DownloadReceipt;