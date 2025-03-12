const ProfileModel = require("../models/ProfileModel");
const cloudinary = require("../config/cloudinary");
const { uploadImageToCloudinary } = require("../services/imageService");

const createProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const user = req.user;

    const image = await uploadImageToCloudinary(req.image.buffer);
    const imageData = { url: image.url, id: image.public_id };

    const newProfile = new ProfileModel({ _id: user._id, profileImage: imageData, ...profileData });

    await newProfile.save();

    const { _id, __v, ...profileDetails } = newProfile.toObject();
    const profile = { ...profileDetails, profileImage: image.url };

    res.status(201).json({ message: "Profil har skapats", profile, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const editProfile = async (req, res) => {
  try {
    const { profileImage, ...profileData } = req.body;
    const user = req.user;

    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { ...profileData } },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profil kunde inte hittas", success: false });
    }

    const profileImageFile = req.file;

    if (profileImageFile) {
      if (updatedProfile.profileImage.id) {
        await cloudinary.uploader.destroy(updatedProfile.profileImage.id);
      }

      const newProfileImage = await uploadImageToCloudinary(profileImageFile.buffer);

      updatedProfile.profileImage = {
        url: newProfileImage.url,
        id: newProfileImage.public_id,
      };
      await updatedProfile.save();
    }

    const { _id, __v, ...profileDetails } = updatedProfile.toObject();

    const profile = { ...profileDetails, profileImage: profileDetails.profileImage.url };

    res.status(200).json({ message: "Profil har uppdaterats", profile, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const getProfile = async (req, res) => {
  const userID = req.user._id;

  try {
    const profileData = await ProfileModel.findById(userID).lean();

    if (!profileData) {
      return res.status(404).json({ message: "Profil kunde inte hittas", success: false });
    }

    const { _id, __v, ...profileDetails } = profileData;
    const profile = { ...profileDetails, profileImage: profileDetails.profileImage.url };

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
