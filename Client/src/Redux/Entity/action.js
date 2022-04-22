export const ADD_ALL_ENTITY = "ADD_ALL_ENTITY";
export const ADD_ALL_CITY = "ADD_ALL_CITY";
export const ENTITY_LODING = "ENTITY_LODING";
export const ENTITY_ERROR = "ENTITY_ERROR";
import axios from "axios";
import { totalCount } from "../Pagination/action";

export const addAllEntity = (payload) => ({ type: ADD_ALL_ENTITY, payload });
export const addAllCity = (payload) => ({ type: ADD_ALL_CITY, payload });
export const entityLoading = (payload) => ({ type: ENTITY_LODING, payload });
export const entityError = (payload) => ({ type: ENTITY_ERROR, payload });

export const getAllEntityFunction = (page, skip) => async (dispatch) => {
  try {
    // ?_page=7&_limit=20
    // skip = page * skip;
    let { data } = await axios.get(
      `http://localhost:5000/entity?_page=${page}&_limit=${skip}`
    );
    // console.log(data);
    dispatch(addAllEntity(data));
    let count = await axios.get("http://localhost:5000/entity");
    dispatch(totalCount(count.data.length));
  } catch (err) {
    console.log(err.message);
  }
};

export const addEntityFunction = (body) => async (dispatch) => {
  try {
    let { data } = await axios.post("http://localhost:5000/entity", body);
    // console.log(data);
    dispatch(getAllEntityFunction());
  } catch (err) {
    console.log(err.message);
  }
};

export const getFilterEntityFunction =
  (page, skip, filter) => async (dispatch) => {
    try {
      let { data } = await axios.get(`http://localhost:5000/entity`);
      if (filter.city != "") {
        data = data.filter((el) => el.city == filter.city);
      }
      if (filter.verified != "") {
        data = data.filter((el) => el.verified == filter.verified);
      }
      if (filter.rating != "") {
        data = data.sort((a, b) => filter.rating * (+a.rating - +b.rating));
      }
      if (filter.cost != "") {
        data = data.sort((a, b) => filter.cost * (+a.cost - +b.cost));
      }

      dispatch(addAllEntity(data));
      dispatch(totalCount(data.length));
    } catch (err) {
      console.log(err.message);
    }
  };

export const getallCitiesFunction = () => async (dispatch) => {
  try {
    let { data } = await axios.get(`http://localhost:5000/cities`);
    dispatch(addAllCity(data));
  } catch (err) {
    console.log(err.message);
  }
};
