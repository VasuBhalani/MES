import Layout from '../../../common/Layout';
import { Outlet } from 'react-router-dom';

const PurchaseLayout = () => {
  return (
    <Layout userRole="purchase">
      {/* Outlet renders matched child route component */}
      <Outlet />
    </Layout>
  );
};

export default PurchaseLayout;
