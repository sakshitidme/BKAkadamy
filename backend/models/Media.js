import mongoose from "mongoose"

const mediaSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      enum: ["video", "image"], 
      required: true 
    },
    url: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String, 
      required: true 
    },
    thumbnail: { 
      type: String, 
      default: "" 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true }
)

const Media = mongoose.model("Media", mediaSchema)
export default Media
