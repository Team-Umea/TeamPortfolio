import { appendToFormData } from "../../utils/helpers";
import axios from "axios";
import { EVENT_ENDPOINTS } from "../endpoints";

export const addEvent = async (event) => {
  const formData = appendToFormData(event);

  try {
    return await axios.post(EVENT_ENDPOINTS.ADDEVENT, formData);
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
    return await axios.put(EVENT_ENDPOINTS.EDITEVENT, formData);
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
    const response = await axios.get(EVENT_ENDPOINTS.GETEVENTS);
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
    const response = await axios.post(EVENT_ENDPOINTS.GETEVENTBYID, { eventID });
    return response.data.event;
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

export const deleteEvent = async (eventID) => {
  try {
    return await axios.delete(`${EVENT_ENDPOINTS.DELETEEVENT}?eventid=${eventID}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när evenemang skulle raderas"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const enrollUser = async (event) => {
  try {
    const response = await axios.post(EVENT_ENDPOINTS.ENROLL, event);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade vid anmälning till evenemang"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};
