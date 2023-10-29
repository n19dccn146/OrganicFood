const Biil = require('../models/bill.model'); // Import your Mongoose model

class BillDAO {
    // Create a new bill
    static async createBill(billData) {
      try {
        const bill = new Bill(billData);
        await bill.save();
        return bill;
      } catch (error) {
        throw error;
      }
    }
  
    // Find a bill by ID
    static async findBillById(billId) {
      try {
        return await Bill.findById(billId);
      } catch (error) {
        throw error;
      }
    }
  
    // Update a bill by ID
    static async updateBill(billId, updateData) {
      try {
        return await Bill.findByIdAndUpdate(billId, updateData, { new: true });
      } catch (error) {
        throw error;
      }
    }
  
    // Delete a bill by ID
    static async deleteBill(billId) {
      try {
        await Bill.findByIdAndRemove(billId);
      } catch (error) {
        throw error;
      }
    }
  
    // Find bills for a specific account
    static async findBillsByAccount(accountId) {
      try {
        return await Bill.find({ account: accountId });
      } catch (error) {
        throw error;
      }
    }
  
    // Other bill-related operations can be added as needed.
  }
  
  module.exports = BillDAO;