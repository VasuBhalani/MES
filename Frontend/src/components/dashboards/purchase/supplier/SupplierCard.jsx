export default function SupplierCard({ name, rating, reviews, orders, total }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold">{name}</span>
        <span className="text-yellow-500 font-bold">{rating} ★</span>
      </div>
      <div className="text-xs text-gray-500">{reviews} reviews</div>
      <div className="text-sm">{orders} Orders • <span className="font-semibold">{total}</span></div>
      <div className="flex gap-2 mt-2">
        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Contact</button>
        <button className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-400">Edit</button>
      </div>
    </div>
  );
}
