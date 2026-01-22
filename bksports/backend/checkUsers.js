import dotenv from "dotenv"
import mongoose from "mongoose"
import User from "./models/User.js"

dotenv.config()

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ MongoDB Connected")
    
    // Get all users
    const users = await User.find({})
    
    if (users.length === 0) {
      console.log("\n⚠️  NO USERS FOUND IN DATABASE!")
      console.log("You need to register a user first.\n")
    } else {
      console.log(`\n📋 Found ${users.length} user(s) in database:\n`)
      users.forEach((user, index) => {
        console.log(`${index + 1}. Name: ${user.name}`)
        console.log(`   Email: ${user.email}`)
        console.log(`   Role: ${user.role}`)
        console.log(`   Created: ${user.createdAt}`)
        console.log(`   Last Login: ${user.lastLogin || 'Never'}\n`)
      })
    }
    
    process.exit(0)
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message)
    process.exit(1)
  }
}

connectDB()
