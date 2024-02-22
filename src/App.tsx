import React, {useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import apiHelper from './dataEndpoints/apiCoreA/apiHelper';
import { useAppDispatch, useAppSelector} from './stores/appStore';
import { setUserData, ISignedInUser } from './stores/signedInUserSlice';
import { setAppRefs } from './stores/appRefsSlice';
import Config from './config';
import OwnerService from './pages/owner/ownerService';
import RoleService from './pages/roles/roleService';
import FeatureService from './pages/feature/featureService';

import InitialDisplay from './components/infoOrWarnings/initialDisplay';
import PublicRoutes from './routes/publicRoutes';
import PrivateRoutes from './routes/privateRoutes';

function App() {
  const apptheme = useAppSelector(state => state.appRefs.appTheme)
  const isSignedIn = useAppSelector(state => state.signedInUser.isSignedIn)
  const dispatch = useAppDispatch()
  const darkTheme = createTheme({
    palette: {
      mode: apptheme,
    },
  })
  

  useEffect(() => {
    const initData = async () => {
      const authToken = localStorage.getItem(Config.TokenKey) || undefined

      // use the auth token from local storage on every private api request
      apiHelper.useToken(authToken)

      // fetch initial data
      // const ownerInfo:ISignedInUser = await OwnerService.reqOwnerCompleteInfo()
      let ownerInfo:ISignedInUser = {
          token: undefined,
          userData: undefined,
          isSignedIn: false,
          role: undefined,
          roles: undefined,
          features: undefined,
          workspace: undefined,
          workspaces: undefined
      }

      try {
        const ownerReqResp = await OwnerService.reqOwnerCompleteInfo()

        // set app stores data
        ownerInfo.userData = ownerReqResp?.data?.userData
        ownerInfo.role = ownerReqResp?.data?.role
        ownerInfo.roles = ownerReqResp?.data?.roles
        ownerInfo.features = ownerReqResp?.data?.features
        ownerInfo.workspace = ownerReqResp?.data?.workspace
        ownerInfo.workspaces = ownerReqResp?.data?.workspaces
        ownerInfo.isSignedIn = true

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
    }

    (async () => {
      console.log('init app')
      await initData()
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
