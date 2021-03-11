import { GET_COORDINATES, GET_CITY } from "../actions/actionTypes";
const initialState = {
  userCoordinates: {},
  city: {},
};
export const openWeather = (state = initialState, action) => {
  switch (action.type) {
    case GET_COORDINATES:
      return {
        ...state,
        userCoordinates: action.coordinates,
      };
    case GET_CITY:
      return {
        ...state,
        city: action.city,
      };
    default:
      return state;
  }
};
