// models/Transaction.js
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    paymentDetails: {
      cardNumber: { type: String, required: true },
      cvv: { type: String, required: true },
      expiryDate: { type: String, required: true },
      nameOnCard: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
