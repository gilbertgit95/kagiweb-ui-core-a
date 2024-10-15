# ui core (type A)
> **Note**
This app is still in the early stages of development.

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
(`If kagiweb-tech/api-core server has been setup and the DB has been seeded using @kagiwe-tech/cli`) A single account is created during seeding. This account is assigned a `Master` Role and has absolute access to all features. Below is the default credential for this account.
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

## Important Terms
> **Note**
These are key terms/words you will frequently come across in the code and documentation.

- `Private` - A state of being signedin. Example: "private pages" means pages that are only visible if a user is signedin.
- `Public` - A state of being signedout. Just the opposite of private.

## Customization
The package contains `apphandler.setAppConfig` object, and this is use to customise the app. The list below are the things you can set in order to customise the application:

- `app info` - information such as app name, server endpoints, default paginations and more.
- `app theme` - color of the app, base on material UI

> **Note**
Theme configuration is base on MUI 5, see https://v5.mui.com/material-ui/customization/theming/. You can also generate your custom theme using this web app https://zenoo.github.io/mui-theme-creator/.


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


## Pages and Routes
This are just React functional component paired with its route.
The two types of this paired data are private and public routes.
Follow the code below for setting up routes.


### Add pages and routes
```ts
...
// Where PublicHomePage, PrivateHomePage are functional components
import PublicHomePage from 'publicHomePage'
import PrivateHomePage from 'privateHomePage'
...

// for public pages
// you can access this page on route <your-server>/pub-home
appHandler.addRoute({url: 'pub-home', page: PublicHomePage}, 'publicRoutes')

// for private pages
// you can access this page on route <your-server>/priv-home
appHandler.addRoute({url: 'priv-home', page: PrivateHomePage }, 'privateRoutes')

...
root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
```

### Update existing pages
```ts
...
// Where PublicHomePage, PrivateHomePage are functional components
import PublicHomePage from 'publicHomePage'
import PrivateHomePage from 'privateHomePage'
...

// for updating a public page
appHandler.updateRoute('pub-home', PublicHomePage, 'publicRoutes')

// for updating a private page
appHandler.updateRoute('priv-home', PrivateHomePage, 'privateRoutes')

...
root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
```



## Navigations
There are two navigation types for this app:
- `main navigations` - in the public view this are located on the top navigation var and in the private view this are located in the drawer.

- `side navigations` - in public view this are located in the left popup menu, and in private view are located in right popup menu.


### Add main navs
```ts
// imports here
...

// for public navs
// visible in the top nav bar of public view
appHandler.addMainNav({
  label: 'Public Main Links',
  links:  [
      { label: 'pub-nav1', url: '/pub-nav-1', Icon: HomeIcon }
      // ...your other public main navigation here
  ]
}, 'privateNavs')

// for private navs
// visible in the slide drawer of private view
appHandler.addMainNav({
  label: 'Private Main Links',
  links:  [
      { label: 'priv-nav1', url: '/priv-nav-1', Icon: HomeIcon },
      // ...your other public main navigation here
  ]
}, 'privateNavs')

...

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
```

### Update main navs
```ts
// imports here
...

// for public navs
appHandler.updateMainNav(
  'Public Main Links', // group label
  '/pub-nav-1', // link url to update
  { label: 'updated-pub-nav1', url: '/updated-pub-nav-1', Icon: HomeIcon },
  'publicNavs'
)

// for private navs
appHandler.updateMainNav(
  'Private Main Links', // group label
  '/pub-nav-1', // link url to update
  { label: 'updated-priv-nav1', url: '/updated-priv-nav-1', Icon: HomeIcon },
  'privateNavs'
)

...

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
```


### Add side navs
```ts
// imports here
...

// for public navs
// visible in the left side popup menu of public view
appHandler.addSideNav({
  label: 'Private Side Links',
  links:  [
      { label: 'pub-nav1', url: '/pub-nav-1', Icon: HomeIcon }
      // ...your other public main navigation here
  ]
}, 'privateNavs')

// for private navs
// visible in the right side popup menu of private view
appHandler.addSideNav({
  label: 'Private Side Links',
  links:  [
      { label: 'priv-nav1', url: '/priv-nav-1', Icon: HomeIcon },
      // ...your other public main navigation here
  ]
}, 'privateNavs')

...

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
```

### Update side navs
```ts
// imports here
...

// for public navs
appHandler.updateSideNav(
  'Public Side Links', // group label
  '/pub-nav-1', // link url to update
  { label: 'updated-pub-nav1', url: '/updated-pub-nav-1', Icon: HomeIcon },
  'publicNavs'
)

// for private navs
appHandler.updateSideNav(
  'Private Side Links', // group label
  '/pub-nav-1', // link url to update
  { label: 'updated-priv-nav1', url: '/updated-priv-nav-1', Icon: HomeIcon },
  'privateNavs'
)

...

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
```

## App Store
A redux app data storage. You can access current signin user data here or even the global data if you have access to it.

Signedin Account:
- `Account Data` - 
- `Active Account Role` - 
- `Account Roles` - 
- `Active Account Workspace` - 
- `Account Workspaces` - 
- `Account External Workspaces` - 
- `Client Device` - 
- `Access Token` - 

App References:
- `Theme` - 
- `roles` - 
- `features` - 


## Models
This are the core app data and is directly related to the server and database schemas.

### Features
Each private pages, server endpoints, ui routes, navigations are treated as a feature. Thus you have the control when giving access to someone.

### Roles
Roles are just the collection of features. The higher the number of features the more the role has access to the app resources.

### Account
User or an organization. Roles are givin to this entity. Below are its major properties.
- `Infos` - Can contain different types of data such as Bithdate, Names, Job Description, Height or more.

- `Contacts` - Data such as email, mobile number and more.

- `Passwords` - Just a limited historical collection of encrypted passwords.

- `Limited Transactions` - Used during otp signin, forgot password,password reset and so on.

- `Workspaces` - To give users way of grouping related data or projects.
  - `Accounts` - Other accounts can also be givin access to your workspaces.

- `Client Devices` - This are just devices that was able to sign into the app. Client device only base on the user agent information.
  - `Access Tokens` - Under client devices are access tokens or authorization keys.

- `Configurations` - Account configuration settings such as the active workspace, the active role and so on.