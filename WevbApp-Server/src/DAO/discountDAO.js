const Discount = require('../models/discount.model'); // Import your Mongoose model

class DiscountDAO {
  // Create a new discount
  static async createDiscount(discountData) {
    try {
      const discount = new Discount(discountData);
      await discount.save();
      return discount;
    } catch (error) {
      throw error;
    }
  }

  // Find a discount by ID
  static async findDiscountById(discountId) {
    try {
      return await Discount.findById(discountId);
    } catch (error) {
      throw error;
    }
  }

  // Update a discount by ID
  static async updateDiscount(discountId, updateData) {
    try {
      return await Discount.findByIdAndUpdate(discountId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a discount by ID
  static async deleteDiscount(discountId) {
    try {
      await Discount.findByIdAndRemove(discountId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DiscountDAO;
