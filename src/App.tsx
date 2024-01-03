import React, {useEffect} from 'react';
import apiHelper from './dataEndpoints/apiCoreA/apiHelper';
import AuthService from './pages/auth/authService';
import { useAppDispatch, useAppSelector} from './stores/appStore';
import { setUserData, clearUserData, ISignedInUser } from './stores/signedInUserSlice';
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
        dispatch(setUserData({
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

      {/* <button onClick={() => {dispatch(setUserData({token: 'testing_token'}))}}>
        set token btn
      </button>

      <button onClick={() => {dispatch(setUserData({userData: 'userData101'}))}}>
        set user btn
      </button> */}

      <button onClick={() => {dispatch(clearUserData())}}>
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
