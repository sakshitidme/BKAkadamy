import express from "express"
import { verifyAdmin } from "../middleware/authMiddleware.js"
import {
  getAllMedia,
  createMedia,
  updateMedia,
  deleteMedia,
} from "../controllers/mediaController.js"

const router = express.Router()

// Public route
router.get("/", getAllMedia)

// Admin routes
router.post("/", verifyAdmin, createMedia)
router.put("/:id", verifyAdmin, updateMedia)
router.delete("/:id", verifyAdmin, deleteMedia)

export default router
