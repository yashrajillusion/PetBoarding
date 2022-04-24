import { applyMiddleware, combineReducers, createStore } from "redux";
import { authReducer } from "./Auth/reducer";
import { bookingReducer } from "./Booking/reducer";
import { entiryReducer } from "./Entity/reducer";
import { paginationReducer } from "./Pagination/reducer";
import { petReducer } from "./Pets/reducer";

const rootReducer = combineReducers({
  entity: entiryReducer,
  pagination: paginationReducer,
  user: authReducer,
  pet: petReducer,
  booking: bookingReducer,
});
const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  next(action);
};

export const store = createStore(rootReducer, applyMiddleware(thunk));
