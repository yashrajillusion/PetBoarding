export const ADD_ALL_ENTITY = "ADD_ALL_ENTITY";
export const ADD_ALL_CITY = "ADD_ALL_CITY";
export const ENTITY_LODING = "ENTITY_LODING";
export const ENTITY_ERROR = "ENTITY_ERROR";
export const CURRENT_ENTITY = "CURRENT_ENTITY";
import axios from "axios";
import { totalCount } from "../Pagination/action";

export const currentEntity = (payload) => ({ type: CURRENT_ENTITY, payload });
export const addAllEntity = (payload) => ({ type: ADD_ALL_ENTITY, payload });
export const addAllCity = (payload) => ({ type: ADD_ALL_CITY, payload });
export const entityLoading = (payload) => ({ type: ENTITY_LODING, payload });
export const entityError = (payload) => ({ type: ENTITY_ERROR, payload });

export const currentEntityFunction = (id) => async (dispatch) => {
  try {
    let { data } = await axios.get(`http://localhost:5001/entity/${id}`);
    dispatch(currentEntity(data));
  } catch (err) {
    console.log(err.message);
  }
};

export const getAllEntityFunction =
  (page, size, { cost, rating, city, verified }) =>
  async (dispatch) => {
    try {
      let { data } = await axios.get(`http://localhost:5001/entity`, {
        params: {
          page,
          size,
          cost,
          rating,
          city,
          verified,
        },
      });
      dispatch(addAllEntity(data.entity));
      dispatch(totalCount(data.total));
    } catch (err) {
      console.log(err.message);
    }
  };

export const addEntityFunction = (body) => async (dispatch) => {
  try {
    let { data } = await axios.post("http://localhost:5001/entity", body);
    // console.log(data);
    dispatch(getAllEntityFunction());
  } catch (err) {
    console.log(err.message);
  }
};
export const editEntityFunction = (body, id) => async (dispatch) => {
  try {
    let { data } = await axios.patch(
      `http://localhost:5001/entity/${id}`,
      body
    );
    dispatch(currentEntity(data));
    dispatch(getAllEntityFunction());
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteEntityFunction = (id) => async (dispatch) => {
  try {
    let { data } = await axios.delete(`http://localhost:5001/entity/${id}`);
    dispatch(getAllEntityFunction());
  } catch (err) {
    console.log(err.message);
  }
};

export const getallCitiesFunction = () => async (dispatch) => {
  try {
    let { data } = await axios.get(`http://localhost:5001/cities`);
    dispatch(addAllCity(data));
  } catch (err) {
    console.log(err.message);
  }
};
