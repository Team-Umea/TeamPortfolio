import axios from "axios";
import { AUTHECHO_ENDPOINTS } from "./endpoints";

export const requestVerificationCode = async ({ user }) => {
  const data = { user };
  try {
    return await axios.post(AUTHECHO_ENDPOINTS.REQUESTCODE, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while requesting verification code."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const verifyVerificationCode = async ({ user, verificationCode }) => {
  const data = { user, verificationCode };

  try {
    const response = await axios.post(AUTHECHO_ENDPOINTS.VERIFYCODE, data);

    if (!response.data.success) {
      throw new Error("Invalid Code");
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while verifying verfication code."
      );
    } else {
      throw new Error("Invalid Code");
    }
  }
};

export const validateSecurityQuestion = async ({ user, questionAnswer }) => {
  const data = { user, questionAnswer };
  try {
    return await axios.post(AUTHECHO_ENDPOINTS.VALIDATEQUESTION, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while validating security question."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const signIn = async ({ user, verificationCode, password }) => {
  const data = { user, verificationCode, password };
  try {
    return await axios.post(AUTHECHO_ENDPOINTS.SIGNIN, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred while signing in.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
