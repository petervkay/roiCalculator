import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';

require('es6-object-assign').polyfill();

const rootReducer = combineReducers({
  form: formReducer,
});

const store = createStore(
	rootReducer, 
	composeWithDevTools()
);

/*Modal.setAppElement('#root');*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

unregister(); // trying to prevent potential caching problems