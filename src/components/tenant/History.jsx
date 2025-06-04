// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Typography, CircularProgress } from "@mui/material";
// import "./History.css";

// const History = ({ tenantId }) => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         // Fetch lease history for the tenant
//         const response = await axios.get(`http://localhost:8085/api/leases/tenant/${tenantId}`);
//         setHistory(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching history:", error);
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, [tenantId]);

//   return (
//     <div className="history-container">
//       <Typography variant="h4" className="history-title">
//         Lease History
//       </Typography>

//       {loading ? (
//         <CircularProgress color="secondary" />
//       ) : history.length === 0 ? (
//         <Typography variant="h6" className="no-history">
//           No lease history found.
//         </Typography>
//       ) : (
//         <div className="history-list">
//           {history.map((lease) => (
//             <div key={lease.leaseId} className="history-card">
//               <Typography variant="h6" className="card-title">
//                 Lease ID: {lease.leaseId}
//               </Typography>
//               <Typography>
//                 <strong>Tenant ID:</strong> {lease.tenantId}
//               </Typography>
//               <Typography>
//                 <strong>Property ID:</strong> {lease.propertyId}
//               </Typography>
//               <Typography>
//                 <strong>Lease Duration:</strong> {lease.duration} months
//               </Typography>
//               <Typography>
//                 <strong>Total Rent Amount:</strong> ₹{lease.rentAmount}
//               </Typography>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";

const History = ({ tenantId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/leases/tenant/${tenantId}`);
        setHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching history:", error);
        setLoading(false);
      }
    };

    if (tenantId) {
      fetchHistory();
    }
  }, [tenantId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="history-container">
      <h2 className="history-title">Lease History</h2>
      {history.length === 0 ? (
        <p className="no-history">No lease history found.</p>
      ) : (
        <div className="history-list">
          {history.map((lease) => (
            <div key={lease.leaseId} className="history-card">
              <h3 className="card-title">Lease ID: {lease.leaseId}</h3>
              <p><strong>Property ID:</strong> {lease.propertyId}</p>
              <p><strong>Duration:</strong> {lease.duration}</p>
              <p><strong>Rent Amount:</strong> ₹{lease.rentAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;