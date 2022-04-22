export const CURRENT_PAGE = "CURRENT_PAGE";
export const ROWS_PER_PAGE = "ROWS_PER_PAGE";
export const TOTAL_COUNT = "TOTAL_COUNT";
export const setPage = (payload) => ({ type: CURRENT_PAGE, payload });
export const setRowsPerPage = (payload) => ({ type: ROWS_PER_PAGE, payload });
export const totalCount = (payload) => ({ type: TOTAL_COUNT, payload });
