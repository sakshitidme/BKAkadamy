import express from "express";
import SiteStats from "../models/SiteStats.js";

const router = express.Router();

// Route to increment and get views
router.post("/increment", async (req, res) => {
  try {
    // Find the first document (we only need one global stats document)
    let stats = await SiteStats.findOne();

    if (!stats) {
      // If no stats exist, create one with initial view count 1
      stats = new SiteStats({ views: 1 });
    } else {
      // Increment the views
      stats.views += 1;
    }

    await stats.save();

    res.status(200).json({ success: true, views: stats.views });
  } catch (error) {
    console.error("Error updating views:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Route to just get views (optional usage)
router.get("/", async (req, res) => {
  try {
    let stats = await SiteStats.findOne();
    const views = stats ? stats.views : 0;
    res.status(200).json({ success: true, views });
  } catch (error) {
    console.error("Error fetching views:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
