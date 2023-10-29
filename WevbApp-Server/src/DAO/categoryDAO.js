const Category = require('../models/category.model'); // Import your Mongoose model

class CategoryDAO {
  // Create a new category
  static async createCategory(categoryData) {
    try {
      const category = new Category(categoryData);
      await category.save();
      return category;
    } catch (error) {
      throw error;
    }
  }

  // Find a category by ID
  static async findCategoryById(categoryId) {
    try {
      return await Category.findById(categoryId);
    } catch (error) {
      throw error;
    }
  }

  // Update a category by ID
  static async updateCategory(categoryId, updateData) {
    try {
      return await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a category by ID
  static async deleteCategory(categoryId) {
    try {
      await Category.findByIdAndRemove(categoryId);
    } catch (error) {
      throw error;
    }
  }

  // Get category surfaces for all categories
  static async getCategorySurfaces() {
    try {
      const categories = await Category.find();
      const surfaces = categories.map((category) => category.surface);
      return surfaces;
    } catch (error) {
      throw error;
    }
  }

  // Check the validity of specsModel
  static checkSpecsModel(specsModel) {
    // Implementation of the checkSpecsModel method
  }

  // Save specsModel for a category
  static async saveSpecsModel(categoryId, specsModel, sessionOpts) {
    try {
      // Find the category
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      // Check the validity of specsModel
      if (!CategoryDAO.checkSpecsModel(specsModel)) {
        throw new Error('Invalid specsModel');
      }

      // Update the specsModel and related products
      // Implementation of the saveSpecsModel method
    } catch (error) {
      throw error;
    }
  }

  // Add a product to a category
  static async addProductToCategory(categoryId, productId) {
    try {
      // Find the category
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      // Find the product
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Add the product to the category
      category.addProduct(product);
      await category.save();
    } catch (error) {
      throw error;
    }
  }

  // Delete a product from a category
  static async deleteProductFromCategory(categoryId, productId) {
    try {
      // Find the category
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      // Find the product
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Delete the product from the category
      category.delProduct(product);
      await category.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryDAO;
