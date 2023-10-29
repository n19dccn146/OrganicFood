const Account = require('../models/account.model'); // Import your Mongoose model

class AccountDAO {
  static async AccountInfo(_id) {
    await Account.findById(_id).select('-notifications -rate_waits');
  }

  static async AccountSurface(_id) {
    var pipeline = [
        {
          $project: {
            email: '$email',
            name: '$name',
            phone: '$phone',
            role: '$role',
            notifications_length: { $size: '$notifications' },
            cart_items: '$cart',
            bills_length: { $sum: '$bills.quantity' }
          }
        },
        {
          $match: { _id }
        }
      ];
      var docs = await Account.aggregate(pipeline);
      if (docs.length > 0) {
        var doc = docs[0];
        doc.cart_items_length = doc.cart_items.reduce((a, b) => a + b.quantity, 0);
        var temp = new Set();
        doc.cart_items.forEach((u) => temp.add(u.product));
        delete doc.cart_items;
        doc.cart_products = [...temp];
        return doc;
      } else return undefined;
  }

  static async isEmailTaken(email, excludeAccountId) {
    const account = await this.findOne({ email, _id: { $ne: excludeAccountId } });
    return !!account;
  }

  static async isPhoneTaken(phone, excludeAccountId) {
    const account = await this.findOne({
        phone,
        _id: { $ne: excludeAccountId }
      });
      return !!account;
  }

  static async isPasswordMatch(password) {
    const account = this;
    return await bcrypt.compare(password, account.password);
  }
}

module.exports = AccountDAO;
