const QuickStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Activity</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Orders Created</span>
            <span className="text-sm font-medium text-gray-900">24</span>  {/* dark text */}
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Orders Delivered</span>
            <span className="text-sm font-medium text-gray-900">18</span>  {/* dark text */}
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">New Suppliers</span>
            <span className="text-sm font-medium text-gray-900">3</span>   {/* dark text */}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">This Month</span>
            <span className="text-sm font-medium text-gray-900">₹4,56,000</span>  {/* dark text, converted to INR */}
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Last Month</span>
            <span className="text-sm font-medium text-gray-900">₹4,22,000</span>  {/* dark text, converted to INR */}
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Growth</span>
            <span className="text-sm font-medium text-green-600">+8.1%</span>  {/* bright green */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;