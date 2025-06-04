// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { TextField, Button, Typography } from "@mui/material";
// import DownloadReceipt from "./DownloadReceipt"; // Import the receipt component
// import "./Payment.css";
// import axios from "axios";
// const Payment = () => {
//   const location = useLocation();
//   const { leaseId, totalAmount, owner, tenant, property } = location.state; // Retrieve details from state

//   const [paymentMode, setPaymentMode] = useState("");
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handlePayment = async () => {
//     try {
//       const paymentData = {
//         leaseId,
//         amount: totalAmount,
//         paymentDate: new Date().toISOString().split("T")[0], // Current date
//         paymentMode,
//       };

//       await axios.post("http://localhost:8086/api/payments", paymentData);
//       setPaymentSuccess(true);
//     } catch (error) {
//       console.error("Error processing payment:", error);
//     }
//   };

//   return (
//     <div className="payment-form">
//       <Typography variant="h4">Payment</Typography>

//       {paymentSuccess ? (
//         <DownloadReceipt
//           leaseId={leaseId}
//           totalAmount={totalAmount}
//           paymentMode={paymentMode}
//           owner={owner}
//           tenant={tenant}
//           property={property}
//         />
//       ) : (
//         <div>
//           <Typography variant="h6">Payment Details:</Typography>
//           <Typography><strong>Total Amount:</strong> ₹{totalAmount}</Typography>

//           <TextField
//             name="paymentMode"
//             label="Payment Mode"
//             variant="outlined"
//             value={paymentMode}
//             onChange={(e) => setPaymentMode(e.target.value)}
//             required
//             fullWidth
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handlePayment}
//             disabled={!paymentMode}
//           >
//             Pay Now
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DownloadReceipt from "./DownloadReceipt";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { leaseId, totalAmount, owner, tenant, property } = location.state || {};

  const [paymentMode, setPaymentMode] = useState("UPI");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!leaseId) {
      navigate('/tenant-dashboard');
    }
  }, [leaseId, navigate]);

  const handlePayment = async () => {
    try {
      const paymentData = {
        leaseId,
        amount: totalAmount,
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMode,
      };

      await axios.post("http://localhost:8086/api/payments", paymentData);
      setPaymentSuccess(true);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const handleDownloadComplete = () => {
    navigate('/tenant-dashboard');
  };

  if (!leaseId || !totalAmount) {
    return <div>Invalid payment details</div>;
  }

  return (
    <div className="payment-form">
      <h2>Payment Details</h2>
      {paymentSuccess ? (
        <div className="success-container">
          <DownloadReceipt
            leaseId={leaseId}
            totalAmount={totalAmount}
            paymentMode={paymentMode}
            owner={owner}
            tenant={tenant}
            property={property}
          />
          <button onClick={handleDownloadComplete} className="return-button">
            Return to Dashboard
          </button>
        </div>
      ) : (
        <div className="payment-container">
          <p>Total Amount: ₹{totalAmount}</p>
          <div className="form-group">
            <label>Payment Mode:</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="NetBanking">Net Banking</option>
            </select>
          </div>
          <button onClick={handlePayment} className="pay-button">
            Process Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;