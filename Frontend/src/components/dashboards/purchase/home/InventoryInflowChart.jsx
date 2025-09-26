import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', units: 110 },
  { day: 'Tue', units: 90 },
  { day: 'Wed', units: 130 },
  { day: 'Thu', units: 105 },
  { day: 'Fri', units: 155 },
  { day: 'Sat', units: 85 },
  { day: 'Sun', units: 75 },
];

export default function InventoryInflowChart() {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Inventory Inflow</h3>
        <div>
          <button className="mr-2 px-3 py-1 rounded bg-blue-100 text-blue-600">Daily</button>
          <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">Weekly</button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="units" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
