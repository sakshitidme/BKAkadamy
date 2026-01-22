import express from "express"
import Contact from "../models/Contact.js"

const router = express.Router()

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: "All fields are required ❌" })
  }

  try {
    const contact = new Contact({ name, email, phone, message })
    await contact.save()
    res.status(201).json({ message: "Message sent successfully ✅" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error, try again ❌" })
  }
})

// GET /api/contact (Protected - Add auth middleware in production)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error fetching contacts" })
  }
})

export default router
