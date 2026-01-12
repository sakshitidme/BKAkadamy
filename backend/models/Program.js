import mongoose from "mongoose"

const programSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    mediaUrl: { 
      type: String, 
      required: true 
    },
    mediaType: { 
      type: String, 
      enum: ["video", "image"], 
      default: "video" 
    },
    order: { 
      type: Number, 
      default: 0 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    isFeatured: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true }
)

const Program = mongoose.model("Program", programSchema)
export default Program
