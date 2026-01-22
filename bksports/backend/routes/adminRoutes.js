import express from "express"
import User from "../models/User.js"
import Enquiry from "../models/Enquiry.js"
import { verifyAdmin } from "../middleware/authMiddleware.js"

const router = express.Router()

// ================= TOTAL USERS =================
router.get("/stats/users", verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    res.json({ totalUsers })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// ================= TOTAL ENQUIRIES =================
router.get("/stats/enquiries", verifyAdmin, async (req, res) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments()
    res.json({ totalEnquiries })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// ================= RECENT LOGINS =================
router.get("/stats/recent-logins", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find(
      { lastLogin: { $exists: true } },
      "-password"
    )
      .sort({ lastLogin: -1 })
      .limit(10)

    res.json({ users })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
})

// ================= ALL USERS TABLE =================
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "-password") .sort({ lastLogin: -1 })
    res.json({ users })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
