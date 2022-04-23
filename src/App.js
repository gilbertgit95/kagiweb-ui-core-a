import AccountContext, { useAccountContext } from './common/contexts/accountContext'
import LocalStorageContext, { useLocalStorageContext } from './common/contexts/localStorageContext'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import PrimaryTheme from './common/themes/primary'
import Pages from './pages'

import './App.css'

function App() {
  const accountStates = useAccountContext()
  const localStorageStates = useLocalStorageContext()

  let theme = createTheme({
    ...PrimaryTheme,
    ...{
      palette: {
        ...PrimaryTheme.palette,
        ...{ mode: localStorageStates.localStorageContext.themeMode}
      }
    }
  })

  return (
    <LocalStorageContext.Provider
      value={{
        ...localStorageStates
      }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AccountContext.Provider
          value={{
            ...accountStates
          }}>
          <Pages />
        </AccountContext.Provider>
      </ThemeProvider>
    </LocalStorageContext.Provider>
  );
}

export default App;
