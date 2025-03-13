const EventModel = require("../models/EventModel");

const getMembers = (_, res) => {
  const members = ["Oscar", "Frank", "Andreas", "Sebastian", "Robin", "Tobias", "Elias", "Neriman"];

  res.status(200).json({ members, success: true });
};

const getEvents = async (_, res) => {
  try {
    const events = await EventModel.find();

    res.status(201).json({ events, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

module.exports = {
  getMembers,
  getEvents,
};
