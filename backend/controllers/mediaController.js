import Media from "../models/Media.js"

// ================= GET ALL MEDIA (PUBLIC) =================
export const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find({ isActive: true }).sort({ createdAt: -1 })
    res.json({ media })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= CREATE MEDIA (ADMIN) =================
export const createMedia = async (req, res) => {
  try {
    const { title, type, url, category, thumbnail } = req.body

    if (!title || !type || !url || !category) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const media = await Media.create({
      title,
      type,
      url,
      category,
      thumbnail: thumbnail || "",
    })

    res.status(201).json({ message: "Media created successfully", media })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= UPDATE MEDIA (ADMIN) =================
export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params
    const { title, type, url, category, thumbnail, isActive } = req.body

    const media = await Media.findByIdAndUpdate(
      id,
      { title, type, url, category, thumbnail, isActive },
      { new: true }
    )

    if (!media) {
      return res.status(404).json({ message: "Media not found" })
    }

    res.json({ message: "Media updated successfully", media })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= DELETE MEDIA (ADMIN) =================
export const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params

    const media = await Media.findByIdAndDelete(id)

    if (!media) {
      return res.status(404).json({ message: "Media not found" })
    }

    res.json({ message: "Media deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
