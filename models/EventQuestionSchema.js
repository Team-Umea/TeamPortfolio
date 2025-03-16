const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventQuestionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    org: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

module.exports = EventQuestionSchema;
