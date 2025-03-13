const cloudinary = require("../config/cloudinary");
const { uploadImageToCloudinary } = require("../services/imageService");
const EventModel = require("../models/EventModel");

const addEvent = async (req, res) => {
  try {
    const eventData = req.body;

    const image = await uploadImageToCloudinary(req.image.buffer);
    const imageData = { url: image.url, id: image.public_id };

    const newEvent = new EventModel({ image: imageData, ...eventData });

    await newEvent.save();

    const { __v, ...eventDetails } = newEvent.toObject();
    const event = { ...eventDetails, image: image.url };

    res.status(201).json({ message: "Evenemang har lagts till", event, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const editEvent = async (req, res) => {
  try {
    const { image, ...eventData } = req.body;

    const updatedEvent = await EventModel.findOneAndUpdate(
      { _id: eventData._id },
      { $set: { ...eventData } },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Evenemang kunde inte hittas", success: false });
    }

    const eventImageFile = req.file;

    if (eventImageFile) {
      if (updatedEvent.image.id) {
        await cloudinary.uploader.destroy(updatedEvent.image.id);
      }

      const newEventImage = await uploadImageToCloudinary(eventImageFile.buffer);

      updatedEvent.image = {
        url: newEventImage.url,
        id: newEventImage.public_id,
      };
      await updatedEvent.save();
    }

    res.status(200).json({ message: "Evenemang har uppdaterats", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const getEvents = async (_, res) => {
  try {
    const eventDocs = await EventModel.find();

    const events = eventDocs.map((ev) => {
      const { __v, ...eventData } = ev.toObject();
      return { ...eventData, image: ev.image.url };
    });

    res.status(201).json({ events, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const getEventById = async (req, res) => {
  const { eventID } = req.body;

  try {
    const eventDoc = await EventModel.findOne({ _id: eventID });

    if (!eventDoc) {
      return res.status(404).json({ message: "Evenemang kunde inte hittas", success: false });
    }

    const { __v, ...eventData } = eventDoc.toObject();
    const event = { ...eventData, image: eventData.image.url };

    res.status(201).json({ event, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const deleteEvent = async (req, res) => {
  const { eventid: eventID } = req.query;

  try {
    await EventModel.deleteOne({ _id: eventID });

    res.status(204).json({ message: "Evenemang har raderats", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

module.exports = {
  addEvent,
  editEvent,
  getEvents,
  getEventById,
  deleteEvent,
};
