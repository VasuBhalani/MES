import React from 'react';
import StatCard from '../../../common/StatCard';
import { ClipboardDocumentListIcon, ClockIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/outline';
import RecentPurchaseOrders from './RecentPurchaseOrders'; // Compact version
import ReorderAlerts from './ReorderAlerts';
import QuickStats from './QuickStats'; // Compact chart section
import { useNavigate } from 'react-router-dom';

const PurchaseDashboard = () => {
  const navigate = useNavigate();0
  return (
    <div className="space-y-6 text-black">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Purchase Dashboard</h1>
        <p className="text-gray-600">Procurement overview and key insights</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="1,247"
          change="+12% from last month"
          icon={ClipboardDocumentListIcon}
          color="blue"
        />
        <StatCard
          title="Pending Orders"
          value="89"
          change="Needs attention"
          icon={ClockIcon}
          color="yellow"
        />
        <StatCard
          title="Total Spend"
          value="$456K"
          change="+8% from last month"
          icon={CurrencyDollarIcon}
          color="green"
        />
        <StatCard
          title="Active Suppliers"
          value="156"
          change="+3 new this month"
          icon={UsersIcon}
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - 2/3 width */}
        <div className="lg:col-span-2">
          <RecentPurchaseOrders />
        </div>
        {/* Reorder Alerts - 1/3 width */}
        <ReorderAlerts />
      </div>

      {/* Quick Stats & Trends */}
      <QuickStats />

      {/* Top Suppliers Preview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Top Suppliers</h3>
          <button 
            onClick = {() => navigate("/purchase/suppliers")} 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">ABC Materials</h4>
              <span className="text-yellow-400 text-sm">★ 4.8</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">45 Orders • $125K</p>
            <p className="text-xs text-gray-500">Construction Materials</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">Steel Corp</h4>
              <span className="text-yellow-400 text-sm">★ 4.5</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">32 Orders • $89K</p>
            <p className="text-xs text-gray-500">Steel & Metal</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">Tech Supplies</h4>
              <span className="text-yellow-400 text-sm">★ 4.9</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">28 Orders • $67K</p>
            <p className="text-xs text-gray-500">Technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDashboard;
