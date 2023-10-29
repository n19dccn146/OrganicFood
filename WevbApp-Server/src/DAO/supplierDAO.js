const Supplier = require('../models/supplier.model'); // Import your Mongoose model

class SupplierDAO {
  // Create a new supplier record
  static async createSupplier(supplierData) {
    try {
      const newSupplier = new Supplier(supplierData);
      await newSupplier.save();
      return newSupplier;
    } catch (error) {
      throw error;
    }
  }

  // Find a supplier record by ID
  static async findSupplierById(supplierId) {
    try {
      return await Supplier.findById(supplierId);
    } catch (error) {
      throw error;
    }
  }

  // Update a supplier record by ID
  static async updateSupplier(supplierId, updateData) {
    try {
      return await Supplier.findByIdAndUpdate(supplierId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a supplier record by ID
  static async deleteSupplier(supplierId) {
    try {
      await Supplier.findByIdAndRemove(supplierId);
    } catch (error) {
      throw error;
    }
  }

  // Find suppliers by name
  static async findSuppliersByName(name) {
    try {
      return await Supplier.find({ name });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SupplierDAO;
