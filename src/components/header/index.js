import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getUserCoordinates } from "../../actions/";

//Components
import UserWeather from "../../components/userWeather";
import Placeholder from "../../components/userWeather/placeholder";

//CSS
import "./index.css";

//Images
import Rio from "../../img/cidades/bg-rio-de-janeiro.jpg";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      coords: {},
      weather: {},
      loading: true,
      loadIcon: false
    };
  }

  getLocation = async () => {
    this.setState({ loadIcon: true });
    if (!navigator.geolocation) {
      return null;
    }

    await navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({
        coords: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        },
      });
      this.props.getUserCoordinates(this.state.coords, (fn) => {
        this.setState({ loading: false, loadIcon: false, weather: fn.data.weather[0] });
      });
    });
  };

  reload() {
    this.getLocation();
  }

  async componentDidMount() {
    await this.getLocation();
  }

  render() {
    const { userCoordinates } = this.props;
    const { name, main = {} } = userCoordinates;
    const { loading, weather, loadIcon } = this.state;

    return (
      <header
        className="header"
        style={{ background: `url(${Rio}) center center / cover no-repeat` }}
      >
        {loading && <Placeholder />}
        {!loading && (
          <UserWeather
            name={name}
            main={main}
            loadIcon={loadIcon}
            weather={weather}
            reload={this.getLocation}
          />
        )}
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  userCoordinates: store.weather.userCoordinates,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUserCoordinates }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
