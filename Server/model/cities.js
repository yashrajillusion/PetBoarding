const mongoose = require("mongoose");
const citiSchema = mongoose.Schema(
  {
    city: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("city", citiSchema);
