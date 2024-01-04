import React, {useEffect} from 'react';
import apiHelper from './dataEndpoints/apiCoreA/apiHelper';
import OwnerService from './pages/owner/ownerService';
import { useAppDispatch, useAppSelector} from './stores/appStore';
import { setUserData, clearUserData, ISignedInUser } from './stores/signedInUserSlice';
import Config from './utils/config';

import PublicRoutes from './pages/publicRoutes';
import PrivateRoutes from './pages/privateRoutes';

function App() {
  // const token = useAppSelector(state => state.signedInUser.token)
  const userData = useAppSelector(state => state.signedInUser.userData)
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
      if (ownerInfo.isSignedIn) dispatch(setUserData({...ownerInfo, ...{token: authToken}}))
    }
    
    (async () => {
      console.log('init app')
      await initData()
    })()
  }, [dispatch])

  return (
    <div className="App">
      <p>App Root component!</p>
      <p>{ userData && userData.username? userData.username: '' }</p>

      {/* <button onClick={() => {dispatch(setUserData({token: 'testing_token'}))}}>
        set token btn
      </button>

      <button onClick={() => {dispatch(setUserData({userData: 'userData101'}))}}>
        set user btn
      </button> */}

      <button onClick={() => {dispatch(clearUserData())}}>
        Signout
      </button>

      {/* render router */}
      { isSignedIn? <PrivateRoutes />: <PublicRoutes /> }

    </div>
  );
}

export default App;
