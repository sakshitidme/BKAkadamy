const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, maxlength: 10 },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", EnquirySchema);
