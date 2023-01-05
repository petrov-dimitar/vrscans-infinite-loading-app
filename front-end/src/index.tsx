import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import ReactDOM from "react-dom/client";
import App from './App';
import './App.scss';

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
     <Provider store={store}>

    <App />
     </Provider>
  </React.StrictMode>
);

