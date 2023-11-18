import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import App from './App';

library.add(faEye, faEyeSlash);

ReactDOM.render(
    <App />
  ,
  document.getElementById('root')
);
