import mongoose from "mongoose";

const siteStatsSchema = new mongoose.Schema({
  views: {
    type: Number,
    default: 0,
  },
});

const SiteStats = mongoose.model("SiteStats", siteStatsSchema);

export default SiteStats;
