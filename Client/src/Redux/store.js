import { applyMiddleware, combineReducers, createStore } from "redux";
import { entiryReducer } from "./Entity/reducer";
import { paginationReducer } from "./Pagination/reducer";

const rootReducer = combineReducers({
  entity: entiryReducer,
  pagination: paginationReducer,
});
const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  next(action);
};

export const store = createStore(rootReducer, applyMiddleware(thunk));
