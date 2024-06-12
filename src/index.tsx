import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

import App, {
  appStore,
  // appComponentsHandler
} from './App';

// create root component
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const customTheme = {
  palette: {
    primary: {
      main: '#9C27B0',
      light: '#E1BEE7',
      dark: '#7B1FA2',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#673AB7',
      contrastText: '#FFFFFF',
      dark: '#512DA8',
      light: '#D1C4E9',
    },
  }
}

root.render(
  <Provider store={appStore}>
    <App theme={customTheme} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
