const mongoose = require("mongoose");
const ImageSchema = require("./ImageSchema");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  event: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  time: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: ImageSchema,
});

const EventModel = mongoose.model("events", EventSchema);

module.exports = EventModel;
