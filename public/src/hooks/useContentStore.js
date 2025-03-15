import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useContentStore = () => {
  const dispatch = useDispatch();
  const contentState = useSelector((state) => state.content);

  const fetchContent = useCallback(() => {
    dispatch({ type: "FETCH_CONTENT" });
  }, [dispatch]);

  return { ...contentState, fetchContent };
};

export default useContentStore;
