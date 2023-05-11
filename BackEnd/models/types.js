const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  type: { type: String, required: true },
  subCategories: { type: Array, required: true },
  isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model("Type", typeSchema);
