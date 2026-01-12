import express from "express"
import { verifyAdmin } from "../middleware/authMiddleware.js"
import {
  getActiveEvent,
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js"

const router = express.Router()

// Public routes
router.get("/active", getActiveEvent)
router.get("/:id", getEventById)

// Admin routes
router.get("/", verifyAdmin, getAllEvents)
router.post("/", verifyAdmin, createEvent)
router.put("/:id", verifyAdmin, updateEvent)
router.delete("/:id", verifyAdmin, deleteEvent)

export default router
