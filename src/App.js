import AccountContext, { UseAccountContext } from './common/context/accountContext'
import LocalStorageContext, { UseLocalStorageContext } from './common/context/localStorageContext'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import PrimaryTheme from './common/themes/primary'
import Pages from './pages'

import './App.css'

function App() {
  const accountStates = UseAccountContext()
  const localStorageStates = UseLocalStorageContext()

  return (
    // <LocalStorageContext
    //   value={{
    //     ...localStorageStates
    //   }}>
      <ThemeProvider theme={PrimaryTheme}>
        <CssBaseline />
        <AccountContext.Provider
          value={{
            ...accountStates
          }}>
          <Pages />
        </AccountContext.Provider>
      </ThemeProvider>
    // </LocalStorageContext>
  );
}

export default App;
