import React, { Component } from "react";

//CSS
import "./index.css";

//Image
import Reload from "../../img/ico-refresh.svg";
import Min from "../../img/ico-arrow-min.svg";
import Max from "../../img/ico-arrow-max.svg";

class userWeather extends Component {
  translateDescription(desc) {
    switch (desc) {
      case "clear sky":
        return "Céu Limpo";
      case "few clouds":
        return "Poucas Nuvens";
      case "scattered clouds":
        return "Nuvens Dispersas";
      case "broken clouds":
        return "Nuvens Quebradas";
      case "shower rain":
        return "";
      case "rain":
        return "Raios";
      case "thunderstorm":
        return "Trovoadas";
      case "snow":
        return "Neve";
      case "mist":
        return "Névoa";

      default:
        return desc;
    }
  }
  render() {
    const { name, weather, main, reload, loadIcon, classe = "" } = this.props;
    return (
      <div className={`weather-data ${classe}`}>
        {reload && (
          <span
            className="weather-data__reload"
            alt="Atualizar"
            title="Atualizar"
            onClick={() => reload()}
          >
            <img
              src={Reload}
              alt=""
              className={`${loadIcon ? "rotate" : ""}`}
            />
          </span>
        )}
        <h3>{name}</h3>
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt=""
          className="weather-data--icon"
        />
        <span className="weather-data--degress">{Math.trunc(main.temp)}°</span>
        <span className="weather-data--">
          {this.translateDescription(weather.description)}
        </span>
        <div className="weather__temp">
          <span className="weather__temp--min">
            <img src={Min} alt="" />
            <strong>{Math.trunc(main.temp_min)}°</strong>
          </span>
          <span className="weather__temp--max">
            <img src={Max} alt="" />
            <strong>{Math.trunc(main.temp_max)}°</strong>
          </span>
        </div>
      </div>
    );
  }
}

export default userWeather;
