import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

const theme = {
  bg: '#FFFDD0',
  fg: '#AC3B61',
  pr: '#123C69',
  sc: '#BAB2B5',
  lt: '#EEE2DC'
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

