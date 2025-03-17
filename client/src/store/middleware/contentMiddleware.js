import { fetchContent } from "../contentSlice";

const getContent = (store) => (next) => (action) => {
  if (action.type === "FETCH_CONTENT") {
    store.dispatch(fetchContent());
  }

  return next(action);
};

export default getContent;
