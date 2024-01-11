import React, {useEffect} from 'react';
import apiHelper from './dataEndpoints/apiCoreA/apiHelper';
import OwnerService from './pages/owner/ownerService';
import { useAppDispatch, useAppSelector} from './stores/appStore';
import { setUserData, ISignedInUser } from './stores/signedInUserSlice';
import Config from './utils/config';

import InitialDisplay from './components/infoOrWarnings/initialDisplay';
import PublicRoutes from './routes/publicRoutes';
import PrivateRoutes from './routes/privateRoutes';

function App() {
  // const token = useAppSelector(state => state.signedInUser.token)
  // const userData = useAppSelector(state => state.signedInUser.userData)
  const isSignedIn = useAppSelector(state => state.signedInUser.isSignedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initData = async () => {
      const authToken = localStorage.getItem(Config.TokenKey) || undefined

      // use the auth token from local storage on every private api request
      apiHelper.useToken(authToken)

      // fetch initial data
      const ownerInfo:ISignedInUser = await OwnerService.reqOwnerCompleteInfo()

      // set token and owner to the app storage
      dispatch(setUserData({...ownerInfo, ...{token: authToken}}))
    }
    
    (async () => {
      console.log('init app')
      await initData()
    })()
  }, [dispatch])

  // console.log('isSignedIn: ', typeof isSignedIn)

  return isSignedIn === undefined? <InitialDisplay />:isSignedIn? <PrivateRoutes />: <PublicRoutes />
}

export default App;
