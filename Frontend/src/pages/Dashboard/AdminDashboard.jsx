import React from 'react';
import Layout from '../../components/common/Layout';
import StatCard from '../../components/dashboard/StatCard';
import UserManagement from '../../components/dashboard/UserManagement';
import SystemAlerts from '../../components/dashboard/SystemAlerts';
import { 
  UsersIcon, 
  CubeIcon, 
  ArchiveBoxIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  return (
    <Layout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Comprehensive system overview and management controls</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="248"
            change="+12%"
            icon={UsersIcon}
            color="blue"
          />
          <StatCard
            title="Active Batches"
            value="1,456"
            change="+8%"
            icon={CubeIcon}
            color="green"
          />
          <StatCard
            title="Materials Stock"
            value="892"
            change="-3%"
            icon={ArchiveBoxIcon}
            color="orange"
          />
          <StatCard
            title="Monthly Sales"
            value="$2.4M"
            change="+15%"
            icon={CurrencyDollarIcon}
            color="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserManagement />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
