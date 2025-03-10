const ProfileModel = require("../models/ProfileModel");

const createProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const user = req.user;
    const newProfile = new ProfileModel({ _id: user._id, ...profileData });

    await newProfile.save();

    res.status(201).json({ message: "Profil har skapats", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server fel", success: false });
  }
};

module.exports = {
  createProfile,
};
