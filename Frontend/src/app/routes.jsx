import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Login from '../pages/Login.jsx';
import Loader from '../components/Loader.jsx';
import { PasswordResetFlow } from '../components/Auth/PasswordResetFlow.jsx';

// Dashboards
import AdminDashboard from '../components/dashboards/admin/home/AdminDashboard.jsx';
import PurchaseDashboard from '../components/dashboards/purchase/home/PurchaseDashboard.jsx';
import PurchaseLayout from '../components/dashboards/purchase/home/PurchaseLayout.jsx';
import UserManagement from '../components/dashboards/admin/home/UserManagement.jsx';
import SupplierPage from '../components/dashboards/purchase/supplier/SupplierPage.jsx';
import AdminLayout from '../components/dashboards/admin/home/AdminLayout.jsx';
// Other dashboards
// const PurchaseDashboard = () => (
//   <div>
//     Purchase Dashboard
//     <Outlet /> {/* Render nested routes here */}
//   </div>
// );
const QADashboard = () => <div>QA Dashboard<Outlet /></div>;
const RecipeDashboard = () => <div>Recipe Dashboard<Outlet /></div>;
const ProductionDashboard = () => <div>Production Dashboard<Outlet /></div>;
const StockDashboard = () => <div>Stock Dashboard<Outlet /></div>;
const FinanceDashboard = () => <div>Finance Dashboard<Outlet /></div>;

const Unauthorized = () => <div>Unauthorized Access</div>;

// PrivateRoute wrapper component with outlet
const PrivateRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; 
};

// PublicRedirect component
const PublicRedirect = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Loader />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />;
};

// Role-based dashboard redirect
const RoleBasedDashboard = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'Admin': return <Navigate to="/admin" replace />;
    case 'Purchase Staff': return <Navigate to="/purchase" replace />;
    case 'QA Manager': return <Navigate to="/qa" replace />;
    case 'Recipe Expert': return <Navigate to="/recipe" replace />;
    case 'Production Head': return <Navigate to="/production" replace />;
    case 'Stock Manager': return <Navigate to="/stock" replace />;
    case 'Finance Officer': return <Navigate to="/finance" replace />;
    default: return <Navigate to="/unauthorized" replace />;
  }
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicRedirect />} />
        <Route path="/login" element={<PublicRedirect />} />
        <Route path="/forgot-password" element={<PasswordResetFlow />} />

        {/* Role-based dashboard redirect */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<RoleBasedDashboard />} />
        </Route>

        {/* Admin routes */}
      <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Route>




        {/* Purchase Staff routes */}
        <Route element={<PrivateRoute allowedRoles={['Purchase Staff', 'Admin']} />}>
          <Route path="/purchase" element={<PurchaseLayout />}>
            <Route index element={<PurchaseDashboard/>} />
            <Route path="orders" element={<div>Orders Page</div>} />
            <Route path="suppliers" element={<SupplierPage/>} />
          </Route>
        </Route>

        {/* QA routes */}
        <Route element={<PrivateRoute allowedRoles={['QA Manager', 'Admin']} />}>
          <Route path="/qa" element={<QADashboard />}>
            <Route index element={<div>Inspections</div>} />
            <Route path="inspections" element={<div>Inspections</div>} />
          </Route>
        </Route>

        {/* Recipe routes */}
        <Route element={<PrivateRoute allowedRoles={['Recipe Expert', 'Admin']} />}>
          <Route path="/recipe" element={<RecipeDashboard />}>
            <Route index element={<div>Create Recipe</div>} />
            <Route path="create" element={<div>Create Recipe</div>} />
          </Route>
        </Route>

        {/* Production routes */}
        <Route element={<PrivateRoute allowedRoles={['Production Head', 'Admin']} />}>
          <Route path="/production" element={<ProductionDashboard />}>
            <Route index element={<div>Schedule</div>} />
            <Route path="schedule" element={<div>Schedule</div>} />
          </Route>
        </Route>

        {/* Stock routes */}
        <Route element={<PrivateRoute allowedRoles={['Stock Manager', 'Admin']} />}>
          <Route path="/stock" element={<StockDashboard />}>
            <Route index element={<div>Inventory</div>} />
            <Route path="inventory" element={<div>Inventory</div>} />
          </Route>
        </Route>

        {/* Finance routes */}
        <Route element={<PrivateRoute allowedRoles={['Finance Officer', 'Admin']} />}>
          <Route path="/finance" element={<FinanceDashboard />}>
            <Route index element={<div>Transactions</div>} />
            <Route path="transactions" element={<div>Transactions</div>} />
          </Route>
        </Route>

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
