import {
  ADD_ALL_CITY,
  ADD_ALL_ENTITY,
  CURRENT_ENTITY,
  ENTITY_ERROR,
  ENTITY_LODING,
} from "./action";

const initState = {
  data: [],
  loading: false,
  error: false,
  city: [],
  current: {},
};
export const entiryReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_ALL_ENTITY:
      return { ...store, data: payload, loading: false, error: false };
    case CURRENT_ENTITY:
      return { ...store, current: payload };
    case ENTITY_LODING:
      return { ...store, loading: payload };
    case ENTITY_ERROR:
      return { ...store, loading: error };
    case ADD_ALL_CITY:
      return { ...store, city: payload };
    default:
      return store;
  }
};
