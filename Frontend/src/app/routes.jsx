// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Login from '../pages/Login.jsx';
import Loader from '../components/Loader.jsx';
import AdminDashboard from '../pages/Dashboard/AdminDashboard.jsx';
import {PasswordResetFlow} from '../components/Auth/PasswordResetFlow.jsx';
// Dummy dashboards (replace with real components)
const PurchaseDashboard = () => <div>Purchase Dashboard</div>;
const QADashboard = () => <div>QA Dashboard</div>;
const RecipeDashboard = () => <div>Recipe Dashboard</div>;
const ProductionDashboard = () => <div>Production Dashboard</div>;
const StockDashboard = () => <div>Stock Dashboard</div>;
const FinanceDashboard = () => <div>Finance Dashboard</div>;
const Unauthorized = () => <div>Unauthorized Access</div>;

// 🔐 Private route wrapper
const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// 🌐 Smart Public Redirect (for / and /login)
const PublicRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />;
};

// 🧠 Role-Based Dashboard Redirect
const RoleBasedDashboard = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'Admin':
      return <Navigate to="/admin" replace />;
    case 'Purchase Staff':
      return <Navigate to="/purchase-dashboard" replace />;
    case 'QA Manager':
      return <Navigate to="/qa-dashboard" replace />;
    case 'Recipe Expert':
      return <Navigate to="/recipe-dashboard" replace />;
    case 'Production Head':
      return <Navigate to="/production-dashboard" replace />;
    case 'Stock Manager':
      return <Navigate to="/stock-dashboard" replace />;
    case 'Finance Officer':
      return <Navigate to="/finance-dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<PublicRedirect />} />
        <Route path="/login" element={<PublicRedirect />} />
        <Route path="/forgot-password" element={<PasswordResetFlow />} />

        {/* Protected Dashboard Redirect */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleBasedDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Other Role-Based Routes */}
        <Route
          path="/purchase-dashboard"
          element={
            <PrivateRoute allowedRoles={['Purchase Staff', 'Admin']}>
              <PurchaseDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/qa-dashboard"
          element={
            <PrivateRoute allowedRoles={['QA Manager', 'Admin']}>
              <QADashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/recipe-dashboard"
          element={
            <PrivateRoute allowedRoles={['Recipe Expert', 'Admin']}>
              <RecipeDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/production-dashboard"
          element={
            <PrivateRoute allowedRoles={['Production Head', 'Admin']}>
              <ProductionDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/stock-dashboard"
          element={
            <PrivateRoute allowedRoles={['Stock Manager', 'Admin']}>
              <StockDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/finance-dashboard"
          element={
            <PrivateRoute allowedRoles={['Finance Officer', 'Admin']}>
              <FinanceDashboard />
            </PrivateRoute>
          }
        />

        {/* Unauthorized & Fallback */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
