const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const { uploadImageToCloudinary } = require("../services/imageService");
const EventModel = require("../models/EventModel");
const EnrollmentModel = require("../models/EnrollmentModel");

require("dotenv").config();

const JWT_KEY = process.env.JWT_APP_TOKEN_KEY;

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
    const eventDocs = await EventModel.find().lean();

    const events = eventDocs.map((ev) => {
      return { ...ev, image: ev.image.url };
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
    const eventDoc = await EventModel.findOne({ _id: eventID }).lean();

    if (!eventDoc) {
      return res.status(404).json({ message: "Evenemang kunde inte hittas", success: false });
    }

    const event = { ...eventDoc, image: eventDoc.image.url };

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

const enrollUser = async (req, res) => {
  const { eventID, org, name } = req.body;

  try {
    const token = req.cookies.enrollmentToken;
    let enrolledEvents = [];

    if (token) {
      const decoded = jwt.verify(token, JWT_KEY);
      enrolledEvents = decoded.enrolledEvents || [];
    }

    if (enrolledEvents.includes(eventID)) {
      return res
        .status(400)
        .json({ message: "Du har redan anmält till detta event", success: false });
    }

    let enrollment = await EnrollmentModel.findOne({ eventID });

    if (enrollment) {
      enrollment.enrollments.push({ org, name });
      await enrollment.save();
    } else {
      const newEnrollment = new EnrollmentModel({
        eventID,
        enrollments: [{ org, name }],
        questions: [],
      });
      await newEnrollment.save();
    }

    enrolledEvents.push(eventID);

    const newToken = jwt.sign({ enrolledEvents, org, name }, JWT_KEY, { expiresIn: "10y" });

    res.cookie("enrollmentToken", newToken, {
      httpOnly: true,
      sameSite: "Strict",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
    });

    res
      .status(200)
      .json({ message: "Du har framgångsrikt anmält dig till eventet!", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const addEventQuestion = async (req, res) => {
  const { eventID, question } = req.body;

  try {
    const token = req.cookies.enrollmentToken;

    if (!token) {
      return res.status(403).json({
        message: "Anmäl dig till event om du vill skicka in frågor eller önskemål",
        success: false,
      });
    }

    const decoded = jwt.verify(token, JWT_KEY);

    if (!decoded) {
      return res.status(403).json({
        message: "Anmäl dig till event om du vill skicka in frågor eller önskemål",
        success: false,
      });
    }

    const org = decoded.org;
    const name = decoded.name;

    await EnrollmentModel.updateOne(
      { eventID: eventID },
      { $push: { questions: { question, org, name } } }
    );

    res.status(200).json({
      message: "Tack för din synpunkt. Vi kommer att ta det i beaktning under evenemanget",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const getEventQuestions = async (req, res) => {
  const { eventid: eventID } = req.query;

  try {
    const enrollment = await EnrollmentModel.findOne({ eventID: eventID });

    if (!enrollment) {
      return res.status(404).json({ message: "Kunde inte hitta anmälning", success: false });
    }

    const questions = enrollment.questions;

    res.status(200).json({
      questions,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const getEventEnrollments = async (req, res) => {
  const { eventid: eventID } = req.query;

  try {
    const enrollment = await EnrollmentModel.findOne({ eventID: eventID });

    if (!enrollment) {
      return res.status(404).json({ message: "Kunde inte hitta anmälning", success: false });
    }

    res.status(200).json({
      enrollment,
      success: true,
    });
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
  enrollUser,
  addEventQuestion,
  getEventQuestions,
  getEventEnrollments,
};
