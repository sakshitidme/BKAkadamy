const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");

// POST /api/enquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    const enquiry = new Enquiry({ name, email, phone, message });
    await enquiry.save();

    res.status(201).json({ message: "Enquiry submitted successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

module.exports = router;
