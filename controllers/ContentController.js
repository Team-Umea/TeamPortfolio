const jwt = require("jsonwebtoken");
const ProfileModel = require("../models/ProfileModel");
const EventModel = require("../models/EventModel");
const ProjectModel = require("../models/ProjectModel");
const { getColleaguesNames } = require("../services/projectService");

require("dotenv").config();

const JWT_KEY = process.env.JWT_APP_TOKEN_KEY;

const getContent = async (req, res) => {
  try {
    const token = req.cookies.enrollmentToken;

    let enrollments;

    if (token) {
      const decoded = jwt.verify(token, JWT_KEY);
      enrollments = decoded.enrolledEvents || [];
    }

    const [profiles, events, projects] = await Promise.all([
      ProfileModel.find().lean(),
      EventModel.find().lean(),
      ProjectModel.find().lean(),
    ]);

    const mappedProfiles = profiles.map((profile) => ({
      ...profile,
      profileImage: profile.profileImage.url,
    }));

    const mappedEvents = events.map((event) => ({
      ...event,
      isEnrolled: enrollments ? enrollments.includes(String(event._id)) : false,
      image: event.image.url,
    }));

    const mappedProjects = await Promise.all(
      projects.map(async (project) => {
        const colleaguesNames = await getColleaguesNames(project.colleagues);
        return { ...project, colleagues: colleaguesNames };
      })
    );

    res
      .status(200)
      .json({
        profiles: mappedProfiles,
        events: mappedEvents,
        projects: mappedProjects,
        success: true,
      });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

module.exports = {
  getContent,
};
