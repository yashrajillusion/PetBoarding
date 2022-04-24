import { ADD_BOOKING, BOOKING_ERROR, BOOKING_LOADING } from "./action";

const initState = {
  booking: [],
  loading: false,
  error: false,
  current: {},
};
export const bookingReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_BOOKING:
      return { ...store, booking: payload, loading: false, error: false };
    case BOOKING_LOADING:
      return { ...store, loading: payload };
    case BOOKING_ERROR:
      return { ...store, error: payload };
    default:
      return store;
  }
};
