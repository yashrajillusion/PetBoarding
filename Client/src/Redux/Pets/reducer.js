import { ADD_PET, PET_ERROR, PET_LOADING } from "./action";

const initState = {
  pet: [],
  loading: false,
  error: false,
  current: {},
};
export const petReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_PET:
      return { ...store, pet: payload, loading: false, error: false };
    case PET_LOADING:
      return { ...store, current: payload };
    case PET_ERROR:
      return { ...store, loading: payload };
    default:
      return store;
  }
};
