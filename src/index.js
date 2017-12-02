import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import ReduxPromise from "redux-promise";
//import reduxThunk from 'redux-thunk';

// CSS
import "materialize-css/dist/css/materialize.min.css";
import "../node_modules/materialize-css/dist/js/materialize.js";
import "./css/style.css";

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

console.log(process.env, "PROCCESS ENV");

// Once the DOM has loaded, render our app.
// NOTE FOR PRODUCTION: DevTools should not be used in production apps!
// window.onload = () => {
//     const root = (
//         <Provider store={store}>
//             <div>
//                 <TodoApp/>
//                 <DevTools/>
//             </div>
//         </Provider>
//     );
//     render(root, document.getElementById('app'));
// }
