import React, {useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import apiHelper from './dataEndpoints/apiCoreA/apiHelper';
import { useAppDispatch, useAppSelector} from './stores/appStore';
import { setUserData, ISignedInUser } from './stores/signedInUserSlice';
import { setAppRefs } from './stores/appRefsSlice';
// import { setAppRefs } from './stores/appRefsSlice';
import Config from './config';
import OwnerService from './pages/owner/ownerService';
import RoleService from './pages/roles/roleService';
import FeatureService from './pages/feature/featureService';

import InitialDisplay from './components/infoOrWarnings/initialDisplay';
import PublicRoutes from './routes/publicRoutes';
import PrivateRoutes from './routes/privateRoutes';

function App() {
  // const token = useAppSelector(state => state.signedInUser.token)
  // const userData = useAppSelector(state => state.signedInUser.userData)
  const apptheme = useAppSelector(state => state.appRefs.appTheme)
  const isSignedIn = useAppSelector(state => state.signedInUser.isSignedIn)
  const dispatch = useAppDispatch()
  const darkTheme = createTheme({
    palette: {
      mode: apptheme,
    },
  })
  

  useEffect(() => {
    // const initAppConfig = async () => {
    //   const theme = localStorage.getItem(Config.AppThemeKey) || undefined
    //   const finalTheme = theme && theme === 'light'? 'light': 'dark'
    //   dispatch(setAppRefs({appTheme: finalTheme}))
    // }
    const initData = async () => {
      const authToken = localStorage.getItem(Config.TokenKey) || undefined

      // use the auth token from local storage on every private api request
      apiHelper.useToken(authToken)

      // fetch initial data
      const ownerInfo:ISignedInUser = await OwnerService.reqOwnerCompleteInfo()

      try {
        // fetch app references, roles and features
        const rolesResp = await RoleService.getAllRoles()
        const featuresResp = await FeatureService.getAllFeatures()
        // set roles and features to app storage
        dispatch(setAppRefs({
          roles: rolesResp?.data?.items || [],
          features: featuresResp?.data?.items || []
        }))
      } catch (err) {
        console.log('Not authorized to fetch app data references')
      }

      // set token and owner to the app storage
      dispatch(setUserData({...ownerInfo, ...{token: authToken}}))

      // console.log({
      //   roles: rolesResp?.data?.items || [],
      //   features: featuresResp?.data?.items || []
      // })
    }

    (async () => {
      console.log('init app')
      // await initAppConfig()
      await initData()
    })()
  }, [dispatch])

  // console.log('isSignedIn: ', typeof isSignedIn)

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
