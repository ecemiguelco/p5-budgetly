const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  accountID: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  dateCreated: { type: Object, required: true },
  note: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
