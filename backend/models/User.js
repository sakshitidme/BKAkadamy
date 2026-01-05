import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    lastLogin: { type: Date },
    role: { 
        type: String, 
         enum: ["user", "admin"], 
         default: "user" 
        },
  
  lastLogin: {
      type: Date,
      default: null,
    },
},
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User
