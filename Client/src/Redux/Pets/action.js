import axios from "axios";
export const ADD_PET = "ADD_PET";
export const PET_LOADING = "PET_LOADING";
export const PET_ERROR = "PET_ERROR";

export const addallPet = (payload) => ({ type: ADD_PET, payload });
export const authLoading = (payload) => ({ type: PET_LOADING, payload });
export const authError = (payload) => ({ type: PET_ERROR, payload });

export const getAllPetFunction = (userid) => async (dispatch) => {
  try {
    let { data } = await axios.get(`http://localhost:5001/pet?user=${userid}`);
    dispatch(addallPet(data));
  } catch (err) {
    console.log(err.message);
  }
};

export const addPetFunction = (body) => async (dispatch) => {
  try {
    let { data } = await axios.post("http://localhost:5001/pet", body);
    dispatch(getAllPetFunction(body.userId));
  } catch (err) {
    console.log(err.message);
  }
};
