import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import ReduxPromise from "redux-promise";
//import reduxThunk from 'redux-thunk';

// CSS/js
import "materialize-css/dist/css/materialize.min.css";
// import "../node_modules/materialize-css/dist/js/materialize.js";
import "./css/style.css";

// window.Hammer = require('./node_modules/materialize-css/js/hammer.min.js');

import App from "./components/app";
import reducers from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";

// Old connection
// const configureStore = applyMiddleware(ReduxPromise)(createStore);

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(ReduxPromise)
    // other store enhancers if any
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV == "production") {
  console.warn("PRODUCTION MODE");
} else {
  console.warn("DEVELOPEMENT MODE");
}

console.log(process.env, "PROCCESS ENV");
