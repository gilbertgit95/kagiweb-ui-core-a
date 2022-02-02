import AccountContext, { UseAccountContext } from './common/context/accountContext'
import { ThemeProvider } from '@mui/material/styles'
import PrimaryTheme from './common/themes/primary'
import Pages from './pages'

import './App.css';

function App() {
  const accountStates = UseAccountContext()

  return (
    <ThemeProvider theme={PrimaryTheme}>
      <AccountContext.Provider
        value={{
          ...accountStates
        }}>
        <Pages />
      </AccountContext.Provider>
    </ThemeProvider>
  );
}

export default App;
