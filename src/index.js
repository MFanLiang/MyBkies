import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import store from './redux/store'
import Router from './router.jsx'
import './admin.less'

const stores = store()

ReactDOM.render(
  <Provider store={stores}>
    <Router />
  </Provider>,
  document.getElementById('root')
);