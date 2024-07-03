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
You dont need to create the core functionality of an account base system because the app is already configured to for this.

<img src="https://raw.githubusercontent.com/gilbertgit95/kagiweb-ui-core-a/master/docs/images/public-pages-e1.png" width="500" />

<img src="https://raw.githubusercontent.com/gilbertgit95/kagiweb-ui-core-a/master/docs/images/private-pages-e1.png" width="500" />

<img src="https://raw.githubusercontent.com/gilbertgit95/kagiweb-ui-core-a/master/docs/images/private-pages-e2.png" width="500" />

## Customization

## Architecture
inprogress...
