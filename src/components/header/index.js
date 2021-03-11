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
      loadIcon: false,
      isActiveMenuMobile: false,
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
        this.setState({
          loading: false,
          loadIcon: false,
          weather: fn.data.weather[0],
        });
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
    const { loading, weather, loadIcon, isActiveMenuMobile } = this.state;

    return (
      <header
        className={`header ${isActiveMenuMobile ? "open" : ""}`}
        style={{ background: `url(${Rio}) center center / cover no-repeat` }}
      >
        <div className="menu-mobile">
          <div
            id="menu-mobile"
            className={`jmenu-mobile ${isActiveMenuMobile ? "open" : ""}`}
            onClick={() =>
              this.setState({
                isActiveMenuMobile: !this.state.isActiveMenuMobile,
              })
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
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
