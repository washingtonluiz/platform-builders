import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { Store } from "./store";

//Componentes
import App from "./App";

//CSS
import "./css/variables.css";
import "./css/global.css";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
