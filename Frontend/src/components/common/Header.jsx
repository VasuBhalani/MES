import { BellIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center space-x-4 ml-auto">
          {/* Bell Icon */}
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
              <span className="text-white text-xs">1</span>
            </span>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">System Admin</p>
            </div>
            <img
              className="h-8 w-8 rounded-full"
              src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff"
              alt="Admin User"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
