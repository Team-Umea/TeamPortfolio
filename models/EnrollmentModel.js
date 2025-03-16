const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
  orgs: {
    type: [String],
    required: true,
  },
  names: {
    type: [String],
    required: true,
  },
});

const EnrollmentModel = mongoose.model("enrollments", EnrollmentSchema);

module.exports = EnrollmentModel;
