import React, { useState, useEffect } from "react";

export default function SupplierForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    category: "",
    contact_name: "",
    status: "Active",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    if (initial) setForm(initial);
    else
      setForm({
        name: "",
        email: "",
        address: "",
        phone: "",
        category: "",
        contact_name: "",
        status: "Active",
        lat: "",
        lng: "",
      });
  }, [initial]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Supplier Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter supplier name"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="contact_name"
            value={form.contact_name}
            onChange={handleChange}
            placeholder="Enter contact name"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Latitude <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="lat"
            type="number"
            step="0.000001"
            min="-90"
            max="90"
            value={form.lat}
            onChange={handleChange}
            placeholder="Enter latitude"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Longitude <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="lng"
            type="number"
            step="0.000001"
            min="-180"
            max="180"
            value={form.lng}
            onChange={handleChange}
            placeholder="Enter longitude"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>
        
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            City <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Enter city"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Enter state"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            required
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Enter country"
            className="w-full p-3 border rounded bg-white text-black"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-800 mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            required
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-white text-black"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {initial ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
