const ProfileModel = require("../models/ProfileModel");
const EventModel = require("../models/EventModel");
const ProjectModel = require("../models/ProjectModel");

const getContent = async (_, res) => {
  try {
    const [profiles, events, projects] = await Promise.all([
      ProfileModel.find().lean(),
      EventModel.find().lean(),
      ProjectModel.find().lean(),
    ]);

    const mappedProfiles = profiles.map((profile) => ({
      ...profile,
      profileImage: profile.profileImage.url,
    }));

    res.status(200).json({ profiles: mappedProfiles, events, projects, success: true });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

module.exports = {
  getContent,
};
