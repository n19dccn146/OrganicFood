const Token = require('../models/token.model'); // Import your Mongoose model

class TokenDAO {
  // Create a new token record
  static async createToken(tokenData) {
    try {
      const newToken = new Token(tokenData);
      await newToken.save();
      return newToken;
    } catch (error) {
      throw error;
    }
  }

  // Find a token record by token string
  static async findTokenByTokenString(tokenString) {
    try {
      return await Token.findOne({ token: tokenString });
    } catch (error) {
      throw error;
    }
  }

  // Update a token record by token string
  static async updateToken(tokenString, updateData) {
    try {
      return await Token.findOneAndUpdate({ token: tokenString }, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete a token record by token string
  static async deleteToken(tokenString) {
    try {
      await Token.findOneAndRemove({ token: tokenString });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TokenDAO;
