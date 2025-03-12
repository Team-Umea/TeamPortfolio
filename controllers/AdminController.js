const ProfileModel = require("../models/ProfileModel");

const createProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const user = req.user;
    const newProfile = new ProfileModel({ _id: user._id, ...profileData });

    console.log("Profile image", req.image);

    await newProfile.save();

    res.status(201).json({ message: "Profil har skapats", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const editProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const user = req.user;

    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { ...profileData } },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profil kunde inte hittas", success: false });
    }

    res.status(201).json({ message: "Profil har skapats", profile: updatedProfile, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const getProfile = async (req, res) => {
  const userID = req.user._id;

  try {
    const profile = await ProfileModel.findById(userID).select("-__v -_id");

    if (!profile) {
      return res.status(404).json({ message: "Profil kunde inte hittas", success: false });
    }

    res.status(200).json({ message: "Profil hittades", profile, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

module.exports = {
  createProfile,
  getProfile,
  editProfile,
};
