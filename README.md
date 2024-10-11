# ui core (type A)
> **Note**
This app is still on its early stage of development

## Overview
A react webapp library that contains the core functionalities of account base application. This app is designed to connect to a @kagiweb/
api-core-a base server.

## Quick Setup
### Project creation
A cli is available for creating and administering kagiweb-tech projects. To create a ui app using @kagiweb-tech/ui-core-a execute the snippet below on your terminal.
```
> npm i -g @kagiweb-tech/cli
> kwtech
```
1. select `App Creator`
2. select `Create - UI Core A (Ts)`
3. enter the project name

This will create a new project folder in the current directory containing the initial codebase. To execute the project, first get inside the project folder and install the packages by executing  `npm i` on the terminal.

### Execution
This is up to you on how you start the application. Just make sure you have imported and use the library in the right way. However if you use `@kagiweb-tech/cli` to setup your project, you can start the development by excuting `npm run dev` and `npm start` to run the build version.

### Initial Account
(If the DB has been seeded using @kagiwe-tech/cli).A single account is created during seeding. This account has a `Master` Role and it has absolute access to all endpoints. The default credential for this account is shown below.
```
nameId: master
password: Master101!
```


## Basic Configuration
The root package contains a ready to use core web application, redux store and an app handler (for customization).
To use the app using the default configuration, just follow the code below.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App, {
  appStore,
  appHandler
} from '@kagiweb-tech/ui-core-a';

// create root component
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
```

The `<App>` component contains, app subsystems, webpages and components such as `signin`, `singout`, `otp signin`, `user management`, `owner settings` and more.
You dont need to create the core functionality of an account base system because the app is already configured for this.

- `<App>` - contains the base app, pages, components, routes and services.
- `appStore` - use by the main app for data storage.
- `appHandler` - to customise the application, add pages, add routes and navigations.

<img src="https://raw.githubusercontent.com/gilbertgit95/kagiweb-ui-core-a/master/docs/images/public-pages-e1.png" width="500" />

<img src="https://raw.githubusercontent.com/gilbertgit95/kagiweb-ui-core-a/master/docs/images/private-pages-e1.png" width="500" />

<img src="https://raw.githubusercontent.com/gilbertgit95/kagiweb-ui-core-a/master/docs/images/private-pages-e2.png" width="500" />


## Customization of Info, Defaults and Theme
The package contains `apphandler.setAppConfig` object, and this is use to customise the app. The list below are the things you can set in order to customise the application:

- `app info` - information such as app name, server endpoints, default paginations and more.
- `app theme` - color of the app, base on material UI

> **Note**
Theme configuration is base on MUI 5, see https://v5.mui.com/material-ui/customization/theming/. You can also generate your custom theme using this web app https://zenoo.github.io/mui-theme-creator/.

Please see below of how to customise the app.

```tsx
...

import App, {
  appStore,
  appHandler
} from '@kagiweb-tech/ui-core-a';

// create root component
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// configure app theme
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

// configure app info
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

// set the custom configuration
appHandler.setAppConfig(customConfig)

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
```

## Setting up navigations
There are 3 ways you can set navigation for this app

### Public Navs

### Private Navs

### Main Navs



## Setting up pages
### Public Pages

### Private Pages



## Models

### Features

### Roles

### Account
inprogress...
