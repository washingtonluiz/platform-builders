import Api from "../services/api";
import { GET_COORDINATES, GET_CITY } from "./actionTypes";

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

export const getCity = (city, fn = () => {}) => {
  return async (dispatch) => {
    const promise = await Api.get(
      `weather?q=${city}&mode=json&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((resp) => {
        fn(resp);
        return resp.data;
      })
      .catch((err) => {
        console.clear();
        fn(err.response.data);

        console.log("Erro: Cidade não encontrada");
      });
    if (promise) {
      dispatch({ type: GET_CITY, city: promise });
    }
  };
};
