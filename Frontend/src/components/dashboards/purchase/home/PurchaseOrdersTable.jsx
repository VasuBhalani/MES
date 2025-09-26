export default function PurchaseOrdersTable() {
  const orders = [
    {id: '#PO-001', supplier: 'ABC Materials', amount: '$12,450', status: 'Pending', date: 'Dec 28, 2024'},
    {id: '#PO-002', supplier: 'Steel Corp', amount: '$8,750', status: 'Approved', date: 'Dec 27, 2024'},
    {id: '#PO-003', supplier: 'Tech Supplies', amount: '$5,200', status: 'Delivered', date: 'Dec 26, 2024'},
  ];

  const statusColors = {
    'Pending': 'bg-yellow-200 text-yellow-800',
    'Approved': 'bg-green-200 text-green-800',
    'Delivered': 'bg-blue-200 text-blue-800',
  };

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Purchase Orders</h3>
        <button className="bg-blue-600 text-white rounded px-4 py-1 hover:bg-blue-700">+ New Order</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500">
            <th className="py-2">ORDER ID</th>
            <th>SUPPLIER</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((row, i) => (
            <tr key={i} className="text-center">
              <td className="py-2 font-mono">{row.id}</td>
              <td>{row.supplier}</td>
              <td>{row.amount}</td>
              <td>
                <span className={`${statusColors[row.status]} rounded px-2 py-1`}>
                  {row.status}
                </span>
              </td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
