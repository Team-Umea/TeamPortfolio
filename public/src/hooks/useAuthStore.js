import { useDispatch, useSelector } from "react-redux";
import {
  clearAuth,
  setEmail,
  setIsAdmin,
  setIsAuthenticated,
  setUsername,
} from "../store/authSlice";
import { useCallback } from "react";

const useAuthStore = () => {
  const dispath = useDispatch();
  const authState = useSelector((state) => state.auth);

  const updateIsAuthenticated = useCallback(
    (isAuthenticated) => {
      dispath(setIsAuthenticated(isAuthenticated));
    },
    [dispath]
  );

  const updateIsAdmin = useCallback(
    (isAdmin) => {
      dispath(setIsAdmin(isAdmin));
    },
    [dispath]
  );

  const updateUsername = useCallback(
    (username) => {
      dispath(setUsername(username));
    },
    [dispath]
  );

  const updateEmail = useCallback(
    (email) => {
      dispath(setEmail(email));
    },
    [dispath]
  );

  const resetAuth = useCallback(() => {
    dispath(clearAuth());
  }, [dispath]);

  return {
    ...authState,
    updateIsAuthenticated,
    updateIsAdmin,
    updateUsername,
    updateEmail,
    resetAuth,
  };
};

export default useAuthStore;
