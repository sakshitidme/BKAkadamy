import dotenv from "dotenv"
import mongoose from "mongoose"
import User from "./models/User.js"
import bcrypt from "bcryptjs"

dotenv.config()

const testAdminRegistration = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ MongoDB Connected\n")

    // Admin credentials
    const adminData = {
      name: "adminUser",
      email: "adminuser@bkacademy.com",
      phone: "766779999",
      password: "admiusern123",
      role: "admin"
    }

    console.log("🔍 Checking if admin already exists...")
    const existingAdmin = await User.findOne({ email: adminData.email.toLowerCase() })
    
    if (existingAdmin) {
      console.log("⚠️  Admin user ALREADY EXISTS in database:")
      console.log({
        id: existingAdmin._id,
        name: existingAdmin.name,
        email: existingAdmin.email,
        role: existingAdmin.role
      })
    } else {
      console.log("❌ Admin user NOT FOUND in database")
      console.log("\n📝 Creating admin user now...")
      
      const hashedPassword = await bcrypt.hash(adminData.password, 10)
      
      const admin = await User.create({
        name: adminData.name,
        email: adminData.email.toLowerCase(),
        phone: adminData.phone,
        password: hashedPassword,
        role: adminData.role
      })
      
      console.log("✅ Admin created successfully!")
      console.log({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      })
    }

    console.log("\n📋 All users in database:")
    const allUsers = await User.find({}, { name: 1, email: 1, role: 1 })
    allUsers.forEach((user, i) => {
      console.log(`${i + 1}. ${user.name} (${user.email}) - Role: ${user.role}`)
    })

    process.exit(0)
  } catch (err) {
    console.error("❌ Error:", err.message)
    process.exit(1)
  }
}

testAdminRegistration()
