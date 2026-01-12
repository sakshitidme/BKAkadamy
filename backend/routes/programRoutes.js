import express from "express"
import { verifyAdmin } from "../middleware/authMiddleware.js"
import {
  getAllPrograms,
  getFeaturedProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js"

const router = express.Router()

// Public routes
router.get("/", getAllPrograms)
router.get("/featured", getFeaturedProgram)

// Admin routes
router.post("/", verifyAdmin, createProgram)
router.put("/:id", verifyAdmin, updateProgram)
router.delete("/:id", verifyAdmin, deleteProgram)

export default router
