const mongoose = require("mongoose");
const { getCurrentDate } = require("../utils/helpers");
const Schema = mongoose.Schema;

const EventEnrollmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    org: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: getCurrentDate(),
    },
  },
  { _id: false }
);

module.exports = EventEnrollmentSchema;
