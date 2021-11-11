import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import './assets/normalize.css';
import './assets/app.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
