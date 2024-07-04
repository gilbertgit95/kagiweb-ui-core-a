# ui core (type A)
> **Note**
This app is still on its early stage of development

## Overview
A react webapp library that contains the core functionalities of account base application. This app is designed to connect to a @kagiweb/api-core-a base server.

## Contents
The root package contains a ready to use core web application, redux store and an app handler (for customization).
To use the app using the default configuration, just follow the code below.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App, { appStore, appHandler } from '@kagiweb/api-core-a';

root.render(
  <Provider store={appStore}>
    <App />
  </Provider>
);
```

The `<App>` component contains, app subsystems, webpages and components such as `signin`, `singout`, `otp signin`, `user management`, `owner settings` and more.
You dont need to create the core functionality of an account base system because the app is already configured to this.

<img src="https://raw.githubusercontent.com/gilbertgit95/kagiweb-ui-core-a/master/docs/images/public-pages-e1.png" width="500" />

<img src="https://raw.githubusercontent.com/gilbertgit95/kagiweb-ui-core-a/master/docs/images/private-pages-e1.png" width="500" />

<img src="https://raw.githubusercontent.com/gilbertgit95/kagiweb-ui-core-a/master/docs/images/private-pages-e2.png" width="500" />


## Customization
The package contains `apphandler` object and this is use customized the app. The list below are the things you can set in order to customise the application:

- `app info` - information such as app name, server endpoints, default paginations and more.
- `app theme` - color of the app, base on material UI
- `public navigations` - links on the popup when you are signed out
- `public pages` - pages and routes when you are signed out
- `private main navigations` - the drawer links when you are signed in
- `private user navigations` - the popup links in the top right corner
- `private pages` - pages and routes when you are signedin

## Architecture
inprogress...
