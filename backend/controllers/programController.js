import Program from "../models/Program.js"

// ================= GET ALL PROGRAMS (PUBLIC) =================
export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true }).sort({ order: 1 })
    res.json({ programs })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= GET FEATURED PROGRAM (PUBLIC) =================
export const getFeaturedProgram = async (req, res) => {
  try {
    const program = await Program.findOne({ isFeatured: true, isActive: true })
    res.json({ program })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= CREATE PROGRAM (ADMIN) =================
export const createProgram = async (req, res) => {
  try {
    const { title, description, mediaUrl, mediaType, order, isFeatured } = req.body

    if (!title || !description || !mediaUrl) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // If setting as featured, unfeatured all others
    if (isFeatured) {
      await Program.updateMany({}, { isFeatured: false })
    }

    const program = await Program.create({
      title,
      description,
      mediaUrl,
      mediaType: mediaType || "video",
      order: order || 0,
      isFeatured: isFeatured || false,
    })

    res.status(201).json({ message: "Program created successfully", program })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= UPDATE PROGRAM (ADMIN) =================
export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, mediaUrl, mediaType, order, isActive, isFeatured } = req.body

    // If setting as featured, unfeatured all others
    if (isFeatured) {
      await Program.updateMany({}, { isFeatured: false })
    }

    const program = await Program.findByIdAndUpdate(
      id,
      { title, description, mediaUrl, mediaType, order, isActive, isFeatured },
      { new: true }
    )

    if (!program) {
      return res.status(404).json({ message: "Program not found" })
    }

    res.json({ message: "Program updated successfully", program })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= DELETE PROGRAM (ADMIN) =================
export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params

    const program = await Program.findByIdAndDelete(id)

    if (!program) {
      return res.status(404).json({ message: "Program not found" })
    }

    res.json({ message: "Program deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
