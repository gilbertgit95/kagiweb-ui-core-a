import React, {useEffect} from 'react';
import api from './dataEndpoints/apiCoreA/api';
import { useAppDispatch, useAppSelector} from './stores/appStore';
import { setData, clearData } from './stores/signedInUserSlice';
// import Config from './utils/config'

function App() {
  const token = useAppSelector(state => state.signedInUser.token)
  const userData = useAppSelector(state => state.signedInUser.userData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const initData = async () => {
      // get token from browser storage
      // const token = localStorage.getItem(Config.TokenKey)
      // then fetch userdata using token
      // const userData = {}

      // set token and userdata to the app storage
      return
    }
    
    (async () => {
      await initData()
    })()
  }, [])

  return (
    <div className="App">
      <p>App Root component!</p>
      <p>{ token }</p>
      <p>{ userData }</p>

    <button onClick={() => {dispatch(setData({token: 'testing_token'}))}}>
        set token btn
      </button>

      <button onClick={() => {dispatch(setData({userData: 'userData101'}))}}>
        set user btn
      </button>

      <button onClick={() => {dispatch(clearData())}}>
        clear btn
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
