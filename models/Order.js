const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    pin: { type: mongoose.Schema.Types.ObjectId, ref: "Pin", required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, default: "", trim: true },
    notes: { type: String, default: "", trim: true, maxlength: 500 },
    paymentMethod: {
      type: String,
      enum: ["online", "cash"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
      index: true,
    },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "EUR" },
    designTitle: { type: String, default: "" },
  },
  { timestamps: true }
);

orderSchema.index({ email: 1, createdAt: -1 });
orderSchema.index({ buyer: 1, createdAt: -1 });

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
