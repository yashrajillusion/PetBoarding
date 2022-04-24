import axios from "axios";

export const AUTH_USER = "AUTH_USER";
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";

export const authUser = (payload) => ({ type: AUTH_USER, payload });
export const authLoading = (payload) => ({ type: AUTH_LOADING, payload });
export const authError = (payload) => ({ type: AUTH_ERROR, payload });

export const authRegister = (url, user) => async (dispatch) => {
  dispatch(authLoading(true));
  try {
    let { data } = await axios.post(url, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(authUser(data));
  } catch (err) {
    console.log(err.message);
  }
};
