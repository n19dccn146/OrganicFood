const Product = require('../models/product.model'); // Import your Mongoose model

class ProductDAO {
  // Create a new product record
  static async createProduct(productData) {
    try {
      const newProduct = new Product(productData);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  // Find a product record by ID
  static async findProductById(productId) {
    try {
      return await Product.findById(productId);
    } catch (error) {
      throw error;
    }
  }

  // Update a product record by ID
  static async updateProduct(productId, updateData) {
    try {
      return await Product.findByIdAndUpdate(productId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a product record by ID
  static async deleteProduct(productId) {
    try {
      await Product.findByIdAndRemove(productId);
    } catch (error) {
      throw error;
    }
  }

  // Find products by category
  static async findProductsByCategory(category) {
    try {
      return await Product.find({ category });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductDAO;
