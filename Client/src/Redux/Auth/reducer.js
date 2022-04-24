import { AUTH_ERROR, AUTH_LOADING, AUTH_USER } from "./action";

const initState = {
  user: {},
  token: "",
  type: null,
  loading: false,
  error: false,
};

export const authReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case AUTH_USER:
      return {
        ...store,
        user: payload.user,
        token: payload.token,
        type: payload.user.role,
        loading: false,
        error: false,
      };
    case AUTH_ERROR:
      return { ...store, error: payload };
    case AUTH_LOADING:
      return { ...store, loading: payload };
    default:
      return store;
  }
};
