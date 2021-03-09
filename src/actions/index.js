import Api from "../services/api";
import { GET_COORDINATES } from "./actionTypes";

export const getUserCoordinates = (coords, fn = () => {}) => {
  return async (dispatch) => {
    const promise = await Api.get(
      `weather?lat=${coords.latitude}&lon=${coords.longitude}&mode=json&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    ).then((resp) => {
      fn(resp);
      return resp.data;
    });
    dispatch({ type: GET_COORDINATES, coordinates: promise });
  };
};
