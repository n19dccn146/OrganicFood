const Chat = require('../models/chat.model'); // Import your Mongoose model

class ChatDAO {
  // Create a new chat
  static async createChat(chatData) {
    try {
      const chat = new Chat(chatData);
      await chat.save();
      return chat;
    } catch (error) {
      throw error;
    }
  }

  // Find a chat by ID
  static async findChatById(chatId) {
    try {
      return await Chat.findById(chatId);
    } catch (error) {
      throw error;
    }
  }

  // Update a chat by ID
  static async updateChat(chatId, updateData) {
    try {
      return await Chat.findByIdAndUpdate(chatId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a chat by ID
  static async deleteChat(chatId) {
    try {
      await Chat.findByIdAndRemove(chatId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ChatDAO;
