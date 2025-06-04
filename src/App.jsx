// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AuthPage from './components/auth/AuthPage';
// import HomePage from './components/home/HomePage';
// import AboutPage from './components/home/AboutPage';
// import TenantDashboard from './components/tenant/TenantDashboard';
// import OwnerDashboard from './components/owner/OwnerDashboard';
// // import TenantDashboard from './components/tenant/TenantDashboard';
// // import NotFound from './pages/NotFound';
// import './App.css';
// import LeaseForm from './components/lease/LeaseForm';
// import Payment from './components/payment/Payment';
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//   <Route path="/" element={<HomePage />} />
//   <Route path="/about" element={<AboutPage />} /> {/* ✅ Add this */}
//   <Route path="/auth" element={<AuthPage />} />
// <Route path="/tenant-dashboard/:id" element={<TenantDashboard />} />
// <Route path="/owner-dashboard/:id" element={<OwnerDashboard />} />
// <Route path="/lease-form/:propertyId/:tenantId" element={<LeaseForm />} />
// <Route path="/payment/:leaseId" element={<Payment />} />
//        {/*   <Route path="/tenant/dashboard" element={<TenantDashboard />} />
//         <Route path="*" element={<NotFound />} /> */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import AboutPage from './components/home/AboutPage';
import AuthPage from './components/auth/AuthPage';
import TenantDashboard from './components/tenant/TenantDashboard';
import OwnerDashboard from './components/owner/OwnerDashboard';
import LeaseForm from './components/lease/LeaseForm';
import Payment from './components/payment/Payment';
import PrivateRoute from './components/auth/PrivateRoute';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/tenant-dashboard" element={
          <PrivateRoute>
            <TenantDashboard />
          </PrivateRoute>
        } />
        <Route path="/lease-form" element={
          <PrivateRoute>
            <LeaseForm />
          </PrivateRoute>
        } />
        <Route path="/payment" element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        } />
        <Route path="/owner-dashboard/:id" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  );
};
export default App;