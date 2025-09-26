import React from 'react';

const orders = [
  { id: '#PO-001', supplier: 'ABC Materials', amount: 12450, status: 'Pending', date: 'Dec 28, 2024' },
  { id: '#PO-002', supplier: 'Steel Corp', amount: 8750, status: 'Approved', date: 'Dec 27, 2024' },
  { id: '#PO-003', supplier: 'Tech Supplies', amount: 5200, status: 'Delivered', date: 'Dec 26, 2024' },
  { id: '#PO-004', supplier: 'Quality Materials', amount: 3100, status: 'Pending', date: 'Dec 25, 2024' },
];

const rupeeFormat = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-green-100 text-green-800',
  Delivered: 'bg-blue-100 text-blue-800',
};

export default function ModernPurchaseOrdersTable() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg text-gray-700 font-semibold mb-4">Recent Purchase Orders</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-700">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wide">Order ID</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wide">Supplier</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wide">Amount</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wide">Status</th>
              <th className="py-3 px-4 font-semibold text-sm uppercase tracking-wide">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ id, supplier, amount, status, date }, idx) => (
              <tr
                key={id}
                className={`transition-colors hover:bg-gray-50 cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
              >
                <td className="py-3 px-4 font-mono text-sm">{id}</td>
                <td className="py-3 px-4 text-sm">{supplier}</td>
                <td className="py-3 px-4 font-semibold text-sm">{rupeeFormat(amount)}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
                    {status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
