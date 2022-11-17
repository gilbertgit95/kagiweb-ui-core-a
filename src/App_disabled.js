import { SnackbarProvider } from 'notistack'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import PrimaryTheme from './common/themes/primary'

import PublicContext, { usePublicContext } from './common/contexts/publicContext'
import StaticOptionsContext, { useStaticOptionsContext } from './common/contexts/staticOptionsContext'
import LocalStorageContext, { useLocalStorageContext } from './common/contexts/localStorageContext'
import AccountContext, { useAccountContext } from './common/contexts/accountContext'
import AdminContext, { useAdminContext } from './common/contexts/adminContext'
import GlobalDialogContext, { useGlobalDialogContext, GlobalDialogComponents } from './common/contexts/globalDialogContext'

import Pages from './pages'

import './App.css'
import config from './config'
import staticOptions from './common/datasource/rest/staticOptions'

function App() {
  const staticOptionsStates = useStaticOptionsContext()
  const publicStates = usePublicContext()
  const adminStates = useAdminContext()
  const accountStates = useAccountContext()
  const localStorageStates = useLocalStorageContext()
  const globalDialogStates = useGlobalDialogContext()

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={ config.notifLength }>
        {/* provides local storage data globally with respect to the pages */}
        <LocalStorageContext.Provider value={{ ...localStorageStates }}>
          {/* provides static data options */}
          <StaticOptionsContext.Provider value={{ ...staticOptionsStates }}>
            {/* provides data sources for public */}
            <PublicContext.Provider value={{ ...publicStates }}>
              {/* provides account data globally with respect to the pages */}
              <AccountContext.Provider value={{ ...accountStates }}>
                {/* provides admin data globally with respect to the pages */}
                <AdminContext.Provider value={{ ...adminStates }}>
                  {/* global dialog popup box */}
                  <GlobalDialogContext.Provider value={{ ...globalDialogStates }}>
                    <Pages />
                    <GlobalDialogComponents
                      onAction={ globalDialogStates.action }
                      {...globalDialogStates.globalDialogContext} />
                  </GlobalDialogContext.Provider>
                </AdminContext.Provider>
              </AccountContext.Provider>
            </PublicContext.Provider>
          </StaticOptionsContext.Provider>
        </LocalStorageContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
