import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/global.css';

import App, { appStore, appComponentsHandler } from './App';

import PublicHomePage from './pages/home/publicHomePage';
import SigninPage from './pages/auth/signinPage';
import SignupPage from './pages/auth/signupPage';
import SigninOTPPage from './pages/auth/signinOtpPage';
import ForgotPasswordPage from './pages/auth/forgotPasswordPage';
import ResetPasswordPage from './pages/auth/resetPasswordPage';

// register routes
appComponentsHandler.addPublicRoute({url: 'index', page: PublicHomePage})
appComponentsHandler.addPublicRoute({url: 'signin', page: SigninPage})
appComponentsHandler.addPublicRoute({url: 'signup', page: SignupPage})
appComponentsHandler.addPublicRoute({url: 'signinOTP', page: SigninOTPPage})
appComponentsHandler.addPublicRoute({url: 'forgotPassword', page: ForgotPasswordPage})
appComponentsHandler.addPublicRoute({url: 'resetPassword', page: ResetPasswordPage})
// add items to main drawers

// add items to user drawers

// create root component
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
