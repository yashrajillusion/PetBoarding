const mongoose = require("mongoose");
const petSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    size: { type: Number, require: true },
    types: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("pet", petSchema);
