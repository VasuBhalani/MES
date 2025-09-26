import React, { useState, useEffect } from "react";
import Modal from "../../../ui/Modal";
import SupplierForm from "./SupplierForm"; // assume form component is in separate file
import SupplierTable from "./SupplierTable"; // assume table component is separate
import {
  fetchSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from './../../../../services/operations/supplierAPI';

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

 useEffect(() => {
  async function load() {
    try {
      const data = await fetchSuppliers();
      setSuppliers(data);
    } catch (error) {
      alert(error.message || 'Failed to fetch suppliers');
    }
  }
  load();
}, []);

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter((sup) =>
    sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sup.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal for adding new supplier
  const openAddModal = () => {
    setEditingSupplier(null);
    setModalVisible(true);
  };

  // Open modal for editing existing supplier
  const openEditModal = (supplier) => {
    console.log("Editing supplier:", supplier);
    setEditingSupplier(supplier);
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setEditingSupplier(null);
  };

  const handleSubmit = async (formData) => {
  try {
    if (editingSupplier) {
      await updateSupplier(editingSupplier.id, formData);
    } else {
      await createSupplier(formData);
    }
    const data = await fetchSuppliers();
    setSuppliers(data);
    closeModal();
  } catch (error) {
    alert(error.message || 'Failed to save supplier');
  }
};

  const handleDelete = async (id) => {
  if (window.confirm('Are you sure to delete?')) {
    try {
      await deleteSupplier(id);
      const data = await fetchSuppliers();
      setSuppliers(data);
    } catch (error) {
      alert(error.message || 'Failed to delete supplier');
    }
  }
};

  return (
  <div className="p-6 space-y-6 min-h-screen bg-gray-50">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
      <button
        onClick={openAddModal}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Supplier
      </button>
    </div>

    <input
      type="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search by name or category"
      className="w-full max-w-md bg-white placeholder-black text-black p-2 border border-black"
    />

    <SupplierTable
      suppliers={filteredSuppliers}
      onEdit={openEditModal}
      onDelete={handleDelete}
    />

    <Modal
      isOpen={modalVisible}
      onClose={closeModal}
      title={editingSupplier ? "Edit Supplier" : "Add Supplier"}
      size="md"
    >
      <SupplierForm
        initial={editingSupplier}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </Modal>
  </div>
);

};

export default SupplierPage;
