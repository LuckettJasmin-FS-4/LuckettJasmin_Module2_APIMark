const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
    required: true
  }
});

module.exports = mongoose.model("Customer", customerSchema);