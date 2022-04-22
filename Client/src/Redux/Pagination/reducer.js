import { CURRENT_PAGE, ROWS_PER_PAGE, TOTAL_COUNT } from "./action";

const initState = {
  page: 1,
  rowsPerPage: 5,
  count: 0,
};

export const paginationReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case CURRENT_PAGE:
      return { ...store, page: payload };
    case ROWS_PER_PAGE:
      return { ...store, rowsPerPage: payload };
    case TOTAL_COUNT:
      return { ...store, count: payload };
    default:
      return store;
  }
};
