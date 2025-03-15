const ProfileModel = require("../models/ProfileModel");

const getColleaguesNames = async (colleagues) => {
  try {
    const profiles = await ProfileModel.find({ _id: { $in: colleagues } });
    const names = profiles.map((profile) => profile.name);

    return names;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getColleaguesNames };
