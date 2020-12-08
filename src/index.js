import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Components/Header";
import "./index.css";
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {createStore} from "redux";
import {HeaderReducer} from "./Store/reducers";

const store = createStore(HeaderReducer);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Header />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
