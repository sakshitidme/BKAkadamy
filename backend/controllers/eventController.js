import Event from "../models/Event.js"

// ================= GET ACTIVE EVENT (PUBLIC) =================
export const getActiveEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ isActive: true }).sort({ createdAt: -1 })
    res.json({ event })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= GET ALL EVENTS (ADMIN) =================
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 })
    res.json({ events })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= GET EVENT BY ID (PUBLIC) =================
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.json({ event })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= CREATE EVENT (ADMIN) =================
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, categories, mediaUrl, registrationEnabled } = req.body

    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      categories: categories || [],
      mediaUrl: mediaUrl || "",
      registrationEnabled: registrationEnabled !== undefined ? registrationEnabled : true,
    })

    res.status(201).json({ message: "Event created successfully", event })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= UPDATE EVENT (ADMIN) =================
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, date, time, location, categories, mediaUrl, isActive, registrationEnabled } = req.body

    const event = await Event.findByIdAndUpdate(
      id,
      { title, description, date, time, location, categories, mediaUrl, isActive, registrationEnabled },
      { new: true }
    )

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.json({ message: "Event updated successfully", event })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// ================= DELETE EVENT (ADMIN) =================
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params

    const event = await Event.findByIdAndDelete(id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    res.json({ message: "Event deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
