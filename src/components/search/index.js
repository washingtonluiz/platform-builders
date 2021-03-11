import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getCity } from "../../actions/";

//Components
import Messages from "../messages";

//CSS
import "./index.css";

//Images
import iconSearch from "../../img/ico-search.svg";
import iconRefresh from "../../img/ico-refresh.svg";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      message: {
        category: "",
        msg: "",
      },
      isAlert: false,
      loadIcon: false,
    };
  }

  handleSearch = (e) => {
    this.setState({ city: e.target.value });
  };

  clear = () => {
    this.setState({
      isAlert: false,
    });
    setTimeout(() => {
      this.setState({
        message: {
          category: "",
          msg: "",
        },
      });
    }, 1000);
  };

  getCityInput = () => {
    const { city } = this.state;
    this.setState({ loadIcon: true });
    if (city === "") {
      this.setState({
        message: {
          category: "Erro",
          msg: "Digite o nome da cidade",
        },
        isAlert: true,
      });
    }
    this.props.getCity(city, (fn) => {
      this.setState({ loadIcon: false });
      if (fn.cod === "404") {
        this.setState({
          message: {
            category: "Erro",
            msg: "Cidade não encontrada",
          },
          isAlert: true,
        });
      }
    });
  };

  closeMessage = () => {
    this.clear();
  };

  render() {
    const { message, isAlert, loadIcon } = this.state;
    return (
      <div className="search">
        <Messages {...message} isAlert={isAlert} close={this.closeMessage} />
        <div className="search__input">
          {/* <label htmlFor="search">Digite a cidade</label> */}
          <input
            type="text"
            id="search"
            onChange={(e) => this.handleSearch(e)}
            placeholder="Digite a cidade"
            autoComplete="off"
          />
          <button
            className="search__input__ico-search"
            onClick={() => this.getCityInput()}
          >
            {loadIcon && (
              <img className="ico-refresh rotate" src={iconRefresh} alt="" />
            )}
            {!loadIcon && <img src={iconSearch} alt="" />}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  city: store.weather.city,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getCity }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
