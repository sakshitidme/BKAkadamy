import dotenv from "dotenv"
import mongoose from "mongoose"
import User from "./models/User.js"
import bcrypt from "bcryptjs"
import readline from "readline"

dotenv.config()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

const updateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ MongoDB Connected\n")

    // Show all admins
    console.log("📋 Current Admin Users:\n")
    const admins = await User.find({ role: "admin" })
    
    if (admins.length === 0) {
      console.log("❌ No admin users found!")
      process.exit(1)
    }

    admins.forEach((admin, i) => {
      console.log(`${i + 1}. ${admin.name} (${admin.email})`)
    })

    // Select admin to update
    console.log("\n")
    const selection = await question(`Select admin number to update (1-${admins.length}): `)
    const selectedIndex = parseInt(selection) - 1

    if (selectedIndex < 0 || selectedIndex >= admins.length) {
      console.log("❌ Invalid selection!")
      process.exit(1)
    }

    const admin = admins[selectedIndex]
    console.log(`\n✅ Selected: ${admin.name} (${admin.email})\n`)

    // Ask what to update
    console.log("What do you want to update?")
    console.log("1. Email only")
    console.log("2. Password only")
    console.log("3. Both email and password")
    console.log("4. Name, email and password (all)")
    
    const choice = await question("\nEnter choice (1-4): ")

    let newName = admin.name
    let newEmail = admin.email
    let newPassword = null

    // Update based on choice
    if (choice === "1" || choice === "3" || choice === "4") {
      newEmail = await question("\nNew Email: ")
      
      // Validate email
      if (!newEmail.includes("@")) {
        console.log("❌ Invalid email format!")
        process.exit(1)
      }

      // Check if email already exists
      const existingUser = await User.findOne({ 
        email: newEmail.toLowerCase(),
        _id: { $ne: admin._id }
      })
      
      if (existingUser) {
        console.log("❌ This email is already in use by another user!")
        process.exit(1)
      }
    }

    if (choice === "2" || choice === "3" || choice === "4") {
      newPassword = await question("New Password (min 8 chars): ")
      
      if (newPassword.length < 8) {
        console.log("❌ Password must be at least 8 characters!")
        process.exit(1)
      }

      const confirmPassword = await question("Confirm Password: ")
      
      if (newPassword !== confirmPassword) {
        console.log("❌ Passwords do not match!")
        process.exit(1)
      }
    }

    if (choice === "4") {
      newName = await question("New Name: ")
      
      if (!newName || newName.trim().length === 0) {
        console.log("❌ Name cannot be empty!")
        process.exit(1)
      }
    }

    // Confirm changes
    console.log("\n📝 Summary of Changes:")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    
    if (newName !== admin.name) {
      console.log(`Name:     ${admin.name} → ${newName}`)
    }
    
    if (newEmail !== admin.email) {
      console.log(`Email:    ${admin.email} → ${newEmail}`)
    }
    
    if (newPassword) {
      console.log(`Password: ******** → ${newPassword}`)
    }
    
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

    const confirm = await question("Confirm update? (yes/no): ")
    
    if (confirm.toLowerCase() !== "yes") {
      console.log("❌ Update cancelled!")
      process.exit(0)
    }

    // Update admin
    if (newName !== admin.name) {
      admin.name = newName
    }
    
    if (newEmail !== admin.email) {
      admin.email = newEmail.toLowerCase()
    }
    
    if (newPassword) {
      admin.password = await bcrypt.hash(newPassword, 10)
    }

    await admin.save()

    console.log("\n✅ Admin updated successfully!\n")
    console.log("🔑 New Login Credentials:")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log(`Name:     ${admin.name}`)
    console.log(`Email:    ${admin.email}`)
    if (newPassword) {
      console.log(`Password: ${newPassword}`)
    }
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("\n⚠️  Save these credentials securely!\n")

    process.exit(0)
  } catch (err) {
    console.error("❌ Error:", err.message)
    process.exit(1)
  }
}

updateAdmin()
