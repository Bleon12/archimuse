const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    bio: { type: String, default: "", trim: true },
    category: { type: String, default: "general", trim: true },
    imageUrl: { type: String, required: true },
    sourceUrl: { type: String, default: "" },
    source: { type: String, enum: ["upload", "pinterest", "curated"], default: "upload" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    price: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: "EUR", trim: true },
    forSale: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

pinSchema.index({ title: "text", bio: "text" });
pinSchema.index({ category: 1, createdAt: -1 });
pinSchema.index({ views: -1 });
pinSchema.index({ source: 1 });
pinSchema.index({ forSale: 1, price: 1 });

module.exports = mongoose.models.Pin || mongoose.model("Pin", pinSchema);
