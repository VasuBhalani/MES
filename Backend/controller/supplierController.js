import prisma from '../config/prismaClient.js';

// Create a new supplier
export const createSupplier = async (req, res) => {
  try {
    // Remove id field if present, ignore it
    const { id, ...data } = req.body;
    
    if (!data.name) {
      return res.status(400).json({ error: "Supplier name is required" });
    }

    // Convert lat/lng to float to avoid type issues
    if (data.lat) data.lat = parseFloat(data.lat);
    if (data.lng) data.lng = parseFloat(data.lng);

    const newSupplier = await prisma.supplier.create({
      data: {
        ...data,
        status: data.status || "Active",
      },
    });

    return res.status(201).json(newSupplier);
  } catch (error) {
    console.error("Error creating supplier:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// List all suppliers
export const getSuppliers = async (req, res) => {
  try {
    console.log("Fetching all suppliers");
    const suppliers = await prisma.supplier.findMany();
      console.log("Suppliers fetched:", suppliers);
    return res.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get supplier by id
export const getSupplierById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const supplier = await prisma.supplier.findUnique({ where: { id } });
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    return res.json(supplier);
  } catch (error) {
    console.error("Error fetching supplier:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update supplier
export const updateSupplier = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updatedSupplier = await prisma.supplier.update({ where: { id }, data });
    return res.json(updatedSupplier);
  } catch (error) {
    console.error("Error updating supplier:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete supplier
export const deleteSupplier = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.supplier.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
