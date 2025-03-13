import { appendToFormData } from "../../utils/helpers";
import { ENDPOINTS } from "../endpoints";
import axios from "axios";

export const addEvent = async (event) => {
  const formData = appendToFormData(event);

  try {
    return await axios.post(ENDPOINTS.ADDEVENT, formData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när evenemang skulle läggas till"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const editEvent = async (event) => {
  const formData = appendToFormData(event);

  try {
    return await axios.put(ENDPOINTS.EDITEVENT, formData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när evenemang skulle redigeras"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const getEvents = async () => {
  try {
    const response = await axios.get(ENDPOINTS.GETEVENTS);
    return response.data.events;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när evenemang skulle hämtas"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const getEventById = async (eventID) => {
  try {
    const response = await axios.post(ENDPOINTS.GETEVENTBYID, { eventID });
    return response.data.event;
  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när evenemang skulle hämtas"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};
