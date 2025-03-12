import { appendToFormData } from "../../utils/helpers";
import { ENDPOINTS } from "../endpoints";

export const addEvent = async (event) => {
  const formData = appendToFormData(event);

  try {
    return await axios.post(ENDPOINTS.ADDEVENT, formData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "Ett fel inträffade när evenemang skull läggas till"
      );
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Ett oväntat fel inträffade");
    }
  }
};
