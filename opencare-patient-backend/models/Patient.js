const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
