const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  accountName: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  startingBalance: { type: Number, required: true },
  currentBalance: { type: Number, required: true },
  dateCreated: { type: Object, required: true },
  isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model("Account", accountSchema);
