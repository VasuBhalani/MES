import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector.js";

import { supplierEndpoints } from "../../features/supplierEndpoints.js";
const { CREATE_SUPPLIER,GET_SUPPLIERS,GET_SUPPLIER,UPDATE_SUPPLIER,DELETE_SUPPLIER } = supplierEndpoints;

export const fetchSuppliers = async () => {
  try {
    const response = await apiConnector('GET',GET_SUPPLIERS);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to fetch suppliers');
    throw error;
  }
};
export const fetchSupplier = async (id) => {
  try {
    
    const response = await apiConnector('GET',GET_SUPPLIERS);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to fetch suppliers');
    throw error;
  }
};

export const createSupplier = async (data) => {
  try {
    const response = await apiConnector('POST', CREATE_SUPPLIER, data, {
      'Content-Type': 'application/json',
    });
    toast.success('Supplier created successfully');
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to create supplier');
    throw error;
  }
};

export const updateSupplier = async (id, data) => {
  try {
    const url = UPDATE_SUPPLIER(id);
    const response = await apiConnector('PUT', url, data, {
      'Content-Type': 'application/json',
    });
    toast.success('Supplier updated successfully');
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to update supplier');
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const url = DELETE_SUPPLIER(id);
    const response = await apiConnector('DELETE', url);
    toast.success('Supplier deleted successfully');
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Failed to delete supplier');
    throw error;
  }
};