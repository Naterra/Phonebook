import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
//import reduxThunk from 'redux-thunk';


import 'materialize-css/dist/css/materialize.min.css';
import './css/style.css';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>, document.getElementById('root') );
