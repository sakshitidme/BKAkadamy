import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true, maxlength: 10 },
    message: { type: String }
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", EnquirySchema);
export default Enquiry;
