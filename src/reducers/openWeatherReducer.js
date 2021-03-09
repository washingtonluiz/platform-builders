import { GET_COORDINATES } from "../actions/actionTypes";
const initialState = {
  userCoordinates: {},
};
export const openWeather = (state = initialState, action) => {
  switch (action.type) {
    case GET_COORDINATES:
      return {
        ...state,
        userCoordinates: action.coordinates,
      };
    default:
      return state;
  }
};
