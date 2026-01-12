import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    date: { 
      type: String, 
      required: true 
    },
    time: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String, 
      required: true 
    },
    categories: [
      {
        name: { type: String, required: true },
        fee: { type: Number, required: true },
      }
    ],
    mediaUrl: { 
      type: String, 
      default: "" 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    registrationEnabled: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true }
)

const Event = mongoose.model("Event", eventSchema)
export default Event
