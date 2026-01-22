import express from "express";
import Enquiry from "../models/Enquiry.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/enquiry - Fetch all enquiries (ADMIN ONLY)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ enquiries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});

// POST /api/enquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

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

export default router;
