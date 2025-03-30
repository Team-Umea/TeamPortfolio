const ProjectModel = require("../models/ProjectModel");
const cloudinary = require("../config/cloudinary");
const { uploadImageToCloudinary } = require("../services/imageService");
const { getColleaguesNames } = require("../services/projectService");

const addProject = async (req, res) => {
  try {
    const projectData = req.body;
    const images = req.files;

    const newProject = new ProjectModel({ ...projectData });

    if (images && images.length > 0) {
      const uploadedImages = await Promise.all(
        images.map((image) => uploadImageToCloudinary(image.buffer))
      );

      newProject.images = uploadedImages.map((newImage) => ({
        url: newImage.url,
        id: newImage.public_id,
      }));
    }

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
    const { _id, ...projectData } = req.body;
    const images = req.files;
    const existingProject = await ProjectModel.findById(_id);

    if (!existingProject) {
      return res.status(404).json({ message: "Projekt kunde inte hittas", success: false });
    }

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id },
      { $set: { ...projectData, images: existingProject.images } },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Projekt kunde inte uppdateras", success: false });
    }

    const imageUrls =
      typeof projectData.images === "string"
        ? [projectData.images]
        : projectData.images
        ? projectData.images
        : [];

    const imagesToDestroy = existingProject.images.filter((img) => !imageUrls.includes(img.url));
    const imagesToKeep = existingProject.images.filter((img) => imageUrls.includes(img.url));

    if (images && images.length > 0) {
      if (existingProject.images && existingProject.images.length > 0) {
        await Promise.all(imagesToDestroy.map((image) => cloudinary.uploader.destroy(image.id)));
      }

      const uploadedImages = await Promise.all(
        images.map((image) => uploadImageToCloudinary(image.buffer))
      );

      const mappedUploadedImages = uploadedImages.map((newImage) => ({
        url: newImage.url,
        id: newImage.public_id,
      }));

      updatedProject.images = [...imagesToKeep, ...mappedUploadedImages];

      await updatedProject.save();
    } else {
      const uploadedImages = projectData?.images || [];
      const existingImages = updatedProject.images;
      const imagesToKeep = existingImages.filter((img) => uploadedImages.includes(img.url));
      updatedProject.images = imagesToKeep;
      await updatedProject.save();
    }

    const { _id: projectId, __v, ...projectDetails } = updatedProject.toObject();

    res
      .status(200)
      .json({ message: "Projekt har uppdaterats", project: projectDetails, success: true });
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
        const images = project?.images?.map((img) => img.url);
        return { ...project, colleagues: colleaguesNames, images };
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
    const images = project.images.map((img) => img.url);

    const projectWithColleaguesNames = {
      ...project,
      colleagues: colleaguesNames,
      images,
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
    const existingProject = await ProjectModel.findById(projectID);

    if (!existingProject) {
      return res.status(404).json({ message: "Projekt kunde inte hittas", success: false });
    }

    if (existingProject.images && existingProject.images.length > 0) {
      await Promise.all(
        existingProject.images.map((image) => cloudinary.uploader.destroy(image.id))
      );
    }

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
