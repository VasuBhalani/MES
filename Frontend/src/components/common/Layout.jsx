import React from 'react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const Layout = ({ children, userRole = 'admin' }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
