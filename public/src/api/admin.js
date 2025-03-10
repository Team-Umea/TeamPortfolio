import axios from "axios";

export const createProfile = async (profile) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 400));
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
