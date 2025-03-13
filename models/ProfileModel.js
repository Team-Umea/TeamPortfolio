const mongoose = require("mongoose");
const ImageSchema = require("./ImageSchema");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
    default: null,
  },
  bio: {
    type: String,
    required: true,
  },
  profileImage: ImageSchema,
});

ProfileSchema.index(
  { name: 1 },
  {
    unique: true,
    collation: { locale: "sv", strength: 2 },
  }
);

ProfileSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: { locale: "sv", strength: 2 },
  }
);

ProfileSchema.index(
  { phone: 1 },
  {
    unique: true,
    collation: { locale: "sv", strength: 2 },
  }
);

ProfileSchema.index(
  { linkedin: 1 },
  {
    unique: true,
    collation: { locale: "sv", strength: 2 },
  }
);

ProfileSchema.index(
  { github: 1 },
  {
    unique: true,
    collation: { locale: "sv", strength: 2 },
  }
);

ProfileSchema.index(
  { portfolio: 1 },
  {
    unique: true,
    collation: { locale: "sv", strength: 2 },
  }
);

const ProfileModel = mongoose.model("profiles", ProfileSchema);

module.exports = ProfileModel;
