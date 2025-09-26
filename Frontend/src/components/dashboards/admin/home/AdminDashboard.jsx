import React from 'react';
import { useSelector } from 'react-redux'; // import selector
import StatCard from '../../../common/StatCard';
import { UsersIcon, CubeIcon, ArchiveBoxIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import UsersPreview from './UsersPreview';

const AdminDashboard = () => {
  const users = useSelector((state) => state.users.users || []); // adapt path as per your slice

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Comprehensive system overview and management controls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={users.length.toString()}
          change="+12%"
          icon={UsersIcon}
          color="blue"
        />
        {/* Other StatCards */}
        <StatCard title="Active Batches" value="1,456" change="+8%" icon={CubeIcon} color="green" />
        <StatCard title="Materials Stock" value="892" change="-3%" icon={ArchiveBoxIcon} color="orange" />
        <StatCard title="Monthly Sales" value="$2.4M" change="+15%" icon={CurrencyDollarIcon} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersPreview />
      </div>
    </div>
  );
};

export default AdminDashboard;
