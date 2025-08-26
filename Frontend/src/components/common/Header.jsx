import { BellIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

// Helper to get initials from first/last name
const getInitials = (user) => {
    if (!user) return '';
    const { firstName, lastName } = user;
    const first = firstName ? firstName[0].toUpperCase() : '';
    const last = lastName ? lastName[0].toUpperCase() : '';
    return first + last;
};

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    console.log("Header user:", user);

    const initials = getInitials(user);

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
                            <p className="text-sm font-medium text-gray-900">{user?.role || ''}</p>
                        </div>
                        {/* Circle with initials */}
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-sm uppercase">
                            {initials}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
