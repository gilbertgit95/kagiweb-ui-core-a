import React, {useEffect} from 'react';
import { useAppDispatch, useAppSelector} from './stores/appStoreHooks';
import { setToken, setUserData, clearData } from './stores/signedInUserSlice'

function App() {
  const token = useAppSelector(state => state.signedInUser.token)
  const userData = useAppSelector(state => state.signedInUser.userData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getToken = async () => {
      console.log(' - get jwt token from memory')
      return
    }
    const fetchUserData = async () => {
      console.log(' - fetch signedIn user data')
      return
    }
    
    (async () => {
      console.log('initial data loading...')
      await getToken()
      await fetchUserData()
      console.log(' - initial data loading has ended')
    })()
  }, [])

  return (
    <div className="App">
      <p>App Root component!</p>
      <p>{ token }</p>
      <p>{ userData }</p>

      <button onClick={() => {dispatch(setToken('testing_token'))}}>
        set token btn
      </button>

      <button onClick={() => {dispatch(setUserData('userData101'))}}>
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
