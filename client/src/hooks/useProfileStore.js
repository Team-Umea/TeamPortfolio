import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPorfile } from "../store/profileSlice";

const useProfileStore = () => {
  const profileState = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const updateProfile = useCallback(
    (profile) => {
      dispatch(setPorfile(profile));
    },
    [dispatch]
  );

  return {
    ...profileState,
    updateProfile,
  };
};

export default useProfileStore;
