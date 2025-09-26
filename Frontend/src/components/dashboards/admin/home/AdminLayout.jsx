import Layout from '../../../common/Layout';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <Layout userRole="admin">
      {/* Outlet renders matched child route component */}
      <Outlet />
    </Layout>
  );
};

export default AdminLayout;
