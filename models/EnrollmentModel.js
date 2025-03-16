const { required } = require("joi");
const mongoose = require("mongoose");
const EventQuestionSchema = require("./EventQuestionSchema");
const { getCurrentDate } = require("../utils/helpers");
const EventEnrollmentSchema = require("./EventEnrollmentSchema");
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
  eventID: {
    type: String,
    required: true,
  },
  enrollments: {
    type: [EventEnrollmentSchema],
    default: [],
  },
  date: {
    type: String,
    default: getCurrentDate(),
  },
  questions: {
    type: [EventQuestionSchema],
    default: [],
  },
});

const EnrollmentModel = mongoose.model("enrollments", EnrollmentSchema);

module.exports = EnrollmentModel;
