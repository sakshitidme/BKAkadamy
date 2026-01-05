import express from "express"
import User from "../models/User.js"
import Enquiry from "../models/Enquiry.js"
import jwt from "jsonwebtoken"

const router = express.Router()

// ================= VERIFY ADMIN =================
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" })

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Admin access only" })

    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

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
