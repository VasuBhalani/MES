import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', Steel: 40, Concrete: 30, Lumber: 20 },
  { month: 'Feb', Steel: 50, Concrete: 35, Lumber: 22 },
  { month: 'Mar', Steel: 55, Concrete: 33, Lumber: 30 },
  { month: 'Apr', Steel: 52, Concrete: 40, Lumber: 31 },
  { month: 'May', Steel: 58, Concrete: 45, Lumber: 35 },
  { month: 'Jun', Steel: 60, Concrete: 50, Lumber: 38 },
];

export default function MaterialCostTrendsChart() {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="font-semibold mb-3">Material Cost Trends</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Steel" stroke="#ef4444" />
          <Line type="monotone" dataKey="Concrete" stroke="#facc15" />
          <Line type="monotone" dataKey="Lumber" stroke="#34d399" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
