import React from "react";
import { FaStar } from "react-icons/fa";

export default function SupplierTable({ suppliers, onEdit, onDelete }) {
  console.log("Rendering SupplierTable with suppliers:", suppliers);
  return (
    <div className="bg-white shadow-lg border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-200 ">
          <tr>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-800 text-left">
              Name
            </th>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-left">
              Contact
            </th>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-left">
              Email
            </th>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-left">
              Phone
            </th>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-left">
              Category
            </th>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-left">
              City
            </th>
            {/* <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-left">
              State
            </th>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-left">
              Country
            </th> */}
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-600 text-left">
              Status
            </th>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-center">
              Rating
            </th>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-center">
              Orders
            </th>
            <th className="sticky top-0 px-4 py-3 font-semibold text-gray-700 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {suppliers.map((sup, idx) => (
            <tr
              key={sup.id}
              className={`transition-colors hover:bg-blue-50 ${
                idx === suppliers.length - 1 ? "rounded-b-xl" : ""
              }`}
            >
              <td className="px-4 py-3 flex items-center gap-2 font-semibold text-gray-900">
                {sup.name}
              </td>
              <td className="px-4 py-3 text-gray-700">{sup.contact_name}</td>
              <td className="px-4 py-3 text-gray-700">{sup.email}</td>
              <td className="px-4 py-3 text-gray-700">{sup.phone}</td>
              <td className="px-4 py-3 font-semibold text-blue-700">{sup.category}</td>
              <td className="px-4 py-3 text-gray-700">{sup.city || "-"}</td>
              {/* <td className="px-4 py-3 text-gray-700">{sup.state || "-"}</td>
              <td className="px-4 py-3 text-gray-700">{sup.country || "-"}</td> */}
              <td className="px-4 py-3">
                <span
                  className={`${
                    sup.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  } px-3 py-1 rounded-full font-semibold text-xs`}
                >
                  {sup.status}
                </span>
              </td>
              <td className="px-4 py-3 text-yellow-500 font-semibold text-center flex items-center justify-center gap-1">
                <FaStar size={16} />
                {sup.rating}
              </td>
              <td className="px-4 py-3 text-center font-semibold text-gray-800">
                {sup.total_orders}
              </td>
              <td className="px-4 py-3 text-center flex gap-2 justify-center">
                <button
                  className="px-3 py-1 rounded bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
                  onClick={() => onEdit(sup)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-100 text-red-700 font-medium shadow hover:bg-red-200 transition"
                  onClick={() => onDelete(sup.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {suppliers.length === 0 && (
            <tr>
              <td colSpan={12} className="text-center text-gray-500 py-10 rounded-b-xl">
                No suppliers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
