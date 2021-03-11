import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getCity } from "../actions/";

//Components
import CityWeather from "../components/userWeather";
import Placeholder from "../components/userWeather/placeholder";

//CSS
import "./index.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      weather: {},
      loading: true,
      loadIcon: false,
    };
  }

  getUserCity = async () => {
    const { city = {} } = this.props;
    const { name } = city;
    this.setState({ loadIcon: true });
    this.props.getCity(name, (fn) => {
      this.setState({
        loading: false,
        loadIcon: false,
        weather: fn.data.weather[0],
      });
    });
  };

  reload() {
    this.getUserCity();
  }

  componentDidMount() {
    const { getCity = {} } = this.props;
    getCity("Brasília", (fn) => {
      this.setState({
        loading: false,
        loadIcon: false,
        weather: fn.data.weather[0],
      });
    });
  }

  render() {
    const { city = {} } = this.props;
    const { name, main = {} } = city;
    const { loading, weather, loadIcon } = this.state;

    return (
      <div className="main">
        {loading && <Placeholder className="main-placeholder" />}
        {!loading && (
          <CityWeather
            name={name}
            main={main}
            loadIcon={loadIcon}
            weather={weather}
            reload={this.getUserCity}
            classe="main-city"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  city: store.weather.city,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getCity }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
