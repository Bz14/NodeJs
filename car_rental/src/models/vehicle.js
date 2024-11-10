const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  make: String,
  model: String,
  year: Number,
  rentalPrice: Number,
});

module.exports = mongoose.model("vehicleModel", vehicleSchema);
