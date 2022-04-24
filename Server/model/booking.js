const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    petId: { type: mongoose.Types.ObjectId, ref: "pet", required: true },
    to: { type: Date, required: true },
    from: { type: Date, require: true },
    status: { type: String, default: "pending" },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("booking", bookingSchema);
