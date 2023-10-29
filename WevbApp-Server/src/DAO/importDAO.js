const Import = require('../models/import.model'); // Import your Mongoose model

class ImportDAO {
  // Create a new import record
  static async createImport(importData) {
    try {
      const newImport = new Import(importData);
      await newImport.save();
      return newImport;
    } catch (error) {
      throw error;
    }
  }

  // Find an import record by ID
  static async findImportById(importId) {
    try {
      return await Import.findById(importId);
    } catch (error) {
      throw error;
    }
  }

  // Update an import record by ID
  static async updateImport(importId, updateData) {
    try {
      return await Import.findByIdAndUpdate(importId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete an import record by ID
  static async deleteImport(importId) {
    try {
      await Import.findByIdAndRemove(importId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ImportDAO;
