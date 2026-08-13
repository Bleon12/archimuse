const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    pin: { type: mongoose.Schema.Types.ObjectId, ref: "Pin", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true, maxlength: 800 },
  },
  { timestamps: true }
);

commentSchema.index({ pin: 1, createdAt: -1 });

module.exports = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
