const mongoose = require("mongoose");
const ImageSchema = require("./ImageSchema");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  project: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
  },
  description: {
    type: String,
  },
  github: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  colleagues: {
    type: [String],
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  images: {
    type: [ImageSchema],
    default: [],
  },
});

const ProjectModel = mongoose.model("projects", ProjectSchema);

module.exports = ProjectModel;
