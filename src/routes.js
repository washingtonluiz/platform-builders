import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Componentes
import Header from "./components/header";
import Search from "./components/search";
import Footer from "./components/footer";

//Views
import Home from "./views";

export default function Routes() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="container--blur"></div>
        <div className="container__content">
          <Header />
          <div className="box-content">
            <Search />
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
