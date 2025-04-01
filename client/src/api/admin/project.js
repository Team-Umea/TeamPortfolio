import axios from "axios";
import { PROJECT_ENDPOINTS } from "../endpoints";
import { appendToFormData } from "../../utils/helpers";

export const addProject = async (project) => {
  const formData = appendToFormData(project);

  try {
    return await axios.post(PROJECT_ENDPOINTS.ADDPROJECT, formData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när projekt skulle läggas till"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const editProject = async (project) => {
  const formData = appendToFormData(project);

  try {
    return await axios.put(PROJECT_ENDPOINTS.EDITPROJECT, formData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när projekt skulle redigeras"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const getProjects = async () => {
  try {
    const response = await axios.get(PROJECT_ENDPOINTS.GETPROJECTS);
    return response.data.projects;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när projekt skulle hämtas"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const getProjectById = async (projectID) => {
  try {
    const response = await axios.post(PROJECT_ENDPOINTS.GETPROJECTBYID, { projectID });
    return response.data.project;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när projekt skulle hämtas"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const deleteProject = async (projectID) => {
  try {
    return await axios.delete(`${PROJECT_ENDPOINTS.DELETEPROJECT}?projectid=${projectID}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när projekt skulle raderas"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};
