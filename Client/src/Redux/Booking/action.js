import axios from "axios";
export const ADD_BOOKING = "ADD_BOOKING";
export const BOOKING_LOADING = "BOOKING_LOADING";
export const BOOKING_ERROR = "BOOKING_ERROR";

export const addallBooking = (payload) => ({ type: ADD_BOOKING, payload });
export const authLoading = (payload) => ({ type: BOOKING_LOADING, payload });
export const authError = (payload) => ({ type: BOOKING_ERROR, payload });

export const getAllBookingFunction = (userid) => async (dispatch) => {
  try {
    let { data } = await axios.get(
      `http://localhost:5001/booking?user=${userid}`
    );
    dispatch(addallBooking(data));
  } catch (err) {
    console.log(err.message);
  }
};

export const addBookingFunction = (body) => async (dispatch) => {
  try {
    let { data } = await axios.post("http://localhost:5001/booking", body);
    console.log(data);
    dispatch(getAllBookingFunction(body.userId));
  } catch (err) {
    console.log(err.message);
  }
};

export const editBookingFunction = (body, id) => async (dispatch) => {
  try {
    let { data } = await axios.patch(
      `http://localhost:5001/booking/${id}`,
      body
    );
    dispatch(getAllBookingFunction(body.userId));
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteBookingFunction = (body, id) => async (dispatch) => {
  try {
    let { data } = await axios.delete(`http://localhost:5001/booking/${id}`);
    dispatch(getAllBookingFunction(body.userId));
  } catch (err) {
    console.log(err.message);
  }
};
