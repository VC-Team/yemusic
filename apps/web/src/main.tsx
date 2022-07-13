import 'reflect-metadata';
import { StrictMode } from 'react';

import * as ReactDOM from 'react-dom';

import App from './App';

import './styles.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
