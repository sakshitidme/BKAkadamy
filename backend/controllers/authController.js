import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// ===== REGISTER USER =====
export const registerUser = async (req, res) => {
  let { name, email, phone, password, role } = req.body

  try {
    email = email.toLowerCase()

    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "user",
    })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ===== LOGIN USER =====
export const loginUser = async (req, res) => {
  let { email, password } = req.body

  try {
    console.log("🔍 Login attempt - Original email:", email)
    email = email.toLowerCase()
    console.log("🔍 Login attempt - Normalized email:", email)

    const user = await User.findOne({ email })
    
    if (!user) {
      console.log("❌ User not found for email:", email)
      // Debug: Show all users in DB
      const allUsers = await User.find({}, { email: 1, name: 1 })
      console.log("📋 All users in database:", allUsers)
      return res.status(404).json({ message: "User not found" })
    }

    console.log("✅ User found:", user.email)

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log("❌ Invalid password for user:", email)
      return res.status(400).json({ message: "Invalid credentials" })
    }

    user.lastLogin = new Date()
    await user.save()

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    console.log("✅ Login successful for:", email)

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    console.error("💥 LOGIN ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
}
