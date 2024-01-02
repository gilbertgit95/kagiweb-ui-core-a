import React, {useEffect} from 'react';
import OwnerApi from './dataEndpoints/apiCoreA/ownerApi';
import apiHelper from './dataEndpoints/apiCoreA/apiHelper';
import AuthService from './pages/auth/authService';
import { useAppDispatch, useAppSelector} from './stores/appStore';
import { setData, clearData, ISignedInUser } from './stores/signedInUserSlice';
import Config from './utils/config'

function App() {
  const token = useAppSelector(state => state.signedInUser.token)
  const userData = useAppSelector(state => state.signedInUser.userData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initData = async () => {
      // get token from browser storage
      const token = localStorage.getItem(Config.TokenKey) || undefined
      apiHelper.setToken(token)

      let appInitData:ISignedInUser = await AuthService.reqAppInitData()

      // set token and owner to the app storage
      if (token && appInitData.userData) {
        dispatch(setData({
          token,
          userData: appInitData.userData,
          isSignedIn: true
        }))
      }
    }
    
    (async () => {
      console.log('init app')
      await initData()
    })()
  }, [dispatch])

  return (
    <div className="App">
      <p>App Root component!</p>
      <p>{ token }</p>
      <p>{ userData && userData.username? userData.username: '' }</p>

      {/* <button onClick={() => {dispatch(setData({token: 'testing_token'}))}}>
        set token btn
      </button>

      <button onClick={() => {dispatch(setData({userData: 'userData101'}))}}>
        set user btn
      </button> */}

      <button onClick={() => {dispatch(clearData())}}>
        Signout
      </button>
      {/* <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>*/}

      {/* load initial data */}
      {/* if still loading then show loading display */}
      {/* check if the user is signedin */}
      {/* if signedin, then load the private router */}
      {/* else if signedout then load the public router */}
    </div>
  );
}

export default App;
