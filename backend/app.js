import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/database.js"
import authRoutes from "./routes/authRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import enquiryRoutes from"./routes/enquiryRoutes.js"
import mediaRoutes from "./routes/mediaRoutes.js"
import programRoutes from "./routes/programRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"



dotenv.config()

const app = express()

// ✅ Middlewares (ORDER MATTERS)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // ⭐ IMPORTANT

// ✅ Root route
app.get("/", (req, res) => {
  res.send("BK Academy API running 🚀")
})



// enquiry routes
app.use("/api/enquiry", enquiryRoutes) 


// ✅ Auth routes
app.use("/api/auth", authRoutes)
 

// Contact routes
app.use("/api/contact", contactRoutes) 

// admin routes
app.use("/api/admin", adminRoutes)

// ✅ CMS routes
app.use("/api/media", mediaRoutes)
app.use("/api/programs", programRoutes)
app.use("/api/events", eventRoutes) 




// ✅ Connect DB AFTER middleware
connectDB()

const PORT = process.env.PORT || 7777
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
