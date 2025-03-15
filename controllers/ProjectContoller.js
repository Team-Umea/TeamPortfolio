const ProjectModel = require("../models/ProjectModel");
const { getColleaguesNames } = require("../services/projectService");

const addProject = async (req, res) => {
  try {
    const projectData = req.body;

    const newProject = new ProjectModel({ ...projectData });

    await newProject.save();

    const { __v, ...project } = newProject.toObject();

    res.status(201).json({ message: "Projekt har lagts till", project, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const editProject = async (req, res) => {
  try {
    const projectData = req.body;

    await ProjectModel.updateOne(
      { _id: projectData._id },
      { $set: { ...projectData } },
      { runValidators: true }
    );

    res.status(200).json({ message: "Projekt har uppdaterats", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const getProjects = async (_, res) => {
  try {
    const projects = await ProjectModel.find().lean();

    const projectsWithColleaguesNames = await Promise.all(
      projects.map(async (project) => {
        const colleaguesNames = await getColleaguesNames(project.colleagues);
        return { ...project, colleagues: colleaguesNames };
      })
    );

    res.status(201).json({ projects: projectsWithColleaguesNames, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const getProjectById = async (req, res) => {
  const { projectID } = req.body;

  try {
    const project = await ProjectModel.findOne({ _id: projectID }).lean();

    if (!project) {
      return res.status(404).json({ message: "Projekt kunde inte hittas", success: false });
    }

    const colleaguesNames = await getColleaguesNames(project.colleagues);

    const projectWithColleaguesNames = {
      ...project,
      colleagues: colleaguesNames,
    };

    res.status(201).json({ project: projectWithColleaguesNames, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

const deleteProject = async (req, res) => {
  const { projectid: projectID } = req.query;

  try {
    await ProjectModel.deleteOne({ _id: projectID });

    res.status(204).json({ message: "Projekt har raderats", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Serverfel", success: false });
  }
};

module.exports = {
  addProject,
  editProject,
  getProjects,
  getProjectById,
  deleteProject,
};
