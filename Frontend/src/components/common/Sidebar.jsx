import { useState } from 'react';
import { 
  HomeIcon, 
  UsersIcon, 
  CogIcon, 
  ShieldCheckIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  BeakerIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Logout } from '../../services/operations/authAPI.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Sidebar = ({ userRole }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState('Dashboard');

  const getMenuItems = (role) => {
    const commonItems = [
      { name: 'Dashboard', icon: HomeIcon, href: '/dashboard' },
    ];

    const roleSpecificItems = {
      admin: [
        { name: 'User Management', icon: UsersIcon, href: '/users' },
        // { name: 'System Settings', icon: CogIcon, href: '/settings' },
        { name: 'Access Control', icon: ShieldCheckIcon, href: '/access' },
        { name: 'Activity Logs', icon: DocumentTextIcon, href: '/logs' },
        { name: 'Alerts & Issues', icon: ExclamationTriangleIcon, href: '/alerts' },
      ],
      qa: [
        { name: 'Test Management', icon: BeakerIcon, href: '/tests' },
        { name: 'Quality Reports', icon: DocumentTextIcon, href: '/quality-reports' },
        { name: 'Bug Tracking', icon: ExclamationTriangleIcon, href: '/bugs' },
        { name: 'Test Analytics', icon: ChartBarIcon, href: '/test-analytics' },
      ],
      finance: [
        { name: 'Financial Reports', icon: CurrencyDollarIcon, href: '/finance-reports' },
        { name: 'Budget Management', icon: ChartBarIcon, href: '/budget' },
        { name: 'Transactions', icon: DocumentTextIcon, href: '/transactions' },
        { name: 'Financial Analytics', icon: ChartBarIcon, href: '/finance-analytics' },
      ]
    };

    return [...commonItems, ...(roleSpecificItems[role] || [])];
  };

  const handleLogout = () => {
      dispatch(Logout(navigate));
  };

  const menuItems = getMenuItems(userRole);

  return (
    <div className="bg-gray-50 w-64 shadow-md border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-lg overflow-hidden">
            <img src="automation.png" alt="logo" />
          </div>
          <span className="text-xl font-bold text-black tracking-tight">SmartMES</span>
        </div>
      </div>
    
      <div className="px-4 flex-1">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
          Main Menu
        </p>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                {item.name}
              </a>
            );
          })}
        </nav>

        {userRole === 'admin' && (
          <div className="mt-8">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Reports
            </p>
            <nav className="space-y-1">
              <a
                href="/analytics"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
              >
                <ChartBarIcon className="mr-3 h-5 w-5 text-gray-500" />
                Analytics
              </a>
              <a
                href="/system-reports"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600"
              >
                <DocumentTextIcon className="mr-3 h-5 w-5 text-gray-500" />
                System Reports
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Logout Button at Bottom */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors group"
        >
          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
