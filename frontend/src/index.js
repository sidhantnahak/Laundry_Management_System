import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import AlertTemplete from 'react-alert-template-basic'


const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <Provider store={store}>
    <AlertProvider template={AlertTemplete}{...options}>
      <App />
    </AlertProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
