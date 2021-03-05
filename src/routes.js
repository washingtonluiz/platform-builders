import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Componentes
import Header from "./components/header";

//Views
import Home from "./views";

export default function Routes() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="container--blur"></div>
        <div className="container__content">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
