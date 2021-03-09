import { openWeather } from "./openWeatherReducer";
import { combineReducers } from "redux";
export const Reducers = combineReducers({
  weather: openWeather,
});
