const History = require('../models/history.model'); // Import your Mongoose model

class HistoryDAO {
  // Create a new history record
  static async createHistory(historyData) {
    try {
      const history = new History(historyData);
      await history.save();
      return history;
    } catch (error) {
      throw error;
    }
  }

  // Find a history record by ID
  static async findHistoryById(historyId) {
    try {
      return await History.findById(historyId);
    } catch (error) {
      throw error;
    }
  }

  // Update a history record by ID
  static async updateHistory(historyId, updateData) {
    try {
      return await History.findByIdAndUpdate(historyId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a history record by ID
  static async deleteHistory(historyId) {
    try {
      await History.findByIdAndRemove(historyId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = HistoryDAO;
