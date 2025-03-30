import axios from "axios";
import { USER_ENDPOINTS } from "./endpoints";

export const subscribe = async () => {
  try {
    return await axios.post(USER_ENDPOINTS.SUBSCRIBE);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Ett fel inträffade vid prenumerationen.");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};
