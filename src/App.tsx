import React, {useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import apiHelper from './dataEndpoints/apiCoreA/apiHelper';
import { useAppDispatch, useAppSelector} from './stores/appStore';
import Config from './config';
import appUtils from './utils/appUtils';

import InitialDisplay from './components/infoOrWarnings/initialDisplay';
import PublicRoutes from './routes/publicRoutes';
import PrivateRoutes from './routes/privateRoutes';

function App() {
  const apptheme = useAppSelector(state => state.appRefs.appTheme)
  const isSignedIn = useAppSelector(state => state.signedInUser?.isSignedIn)
  const dispatch = useAppDispatch()
  const darkTheme = createTheme({
    palette: {
      mode: apptheme,
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
  })
  

  useEffect(() => {
    (async () => {
      console.log('init app')
      const authToken = localStorage.getItem(Config.TokenKey) || undefined
      // use the auth token from local storage on every private api request
      apiHelper.useToken(authToken)

      try {
        await appUtils.loadSigninUserData()
        await appUtils.loadAppRefsData()
      } catch (err) {
        console.log('Not authorized to fetch app data references')
      }
    })()
  }, [dispatch])


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {
        isSignedIn === undefined? <InitialDisplay />:isSignedIn? <PrivateRoutes />: <PublicRoutes />
      }
    </ThemeProvider>
    
  )
}

export default App;
