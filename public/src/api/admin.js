import axios from "axios";
import { ENDPOINTS } from "./endpoints";

export const createProfile = async (profile) => {
  try {
    const response = await axios.post(ENDPOINTS.CREATEPROFILE, profile);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade vid skapandet av profile"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(ENDPOINTS.GETPROFILE);
    return response.data.profile;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade vid skapandet av profile"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};
