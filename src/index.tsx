import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

import App, {
  appStore,
  appHandler
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

const customConfig = {
  AppName: 'Kagiweb tech',
  AppDescription: '',
  ServerAddress: 'http://127.0.0.1:5000',
  RootApiEndpoint: '/api/v1/',
  TokenKey: '_auth_token',
  AppThemeKey: '_app_theme',
  AppThemeConfig: customTheme,

  defaultDateFormat: 'YYYY-MM-DD',
  defaultDateTimeFormat: 'ddd MMM DD YYYY, hh:mm:ss A',
  defaultPageSizeList: [5, 10, 25, 100],
  defaultPageSize: 10,
  defaultPage: 1
}

appHandler.setAppConfig(customConfig)
root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
