router.post("/create-admin", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing)
      return res.status(400).json({ message: "Admin already exists" })

    const hashed = await bcrypt.hash(password, 10)

    const admin = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashed,
      role: "admin",
    })

    res.json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error succesfully" })
  }
})
