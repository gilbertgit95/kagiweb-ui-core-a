import React, {useEffect} from 'react';

function App() {
  useEffect(() => {
    console.log('initial data loading...')
  }, [])

  return (
    <div className="App">
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
