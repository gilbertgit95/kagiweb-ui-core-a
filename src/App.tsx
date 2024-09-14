import React, {useEffect, useCallback} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import NotesIcon from '@mui/icons-material/Notes';
import TaskIcon from '@mui/icons-material/Task';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyIcon from '@mui/icons-material/Key';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import GroupIcon from '@mui/icons-material/Group';

import CssBaseline from '@mui/material/CssBaseline';
import apiHelper from './dataEndpoints/apiCoreA/apiHelper';
import { useAppDispatch, useAppSelector} from './stores/appStore';
import { setAppRefs } from './stores/appRefsSlice';
import appUtils from './utils/appUtils';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/global.css';

import InitialDisplay from './components/infoOrWarnings/initialDisplay';
import PublicRoutes from './routes/publicRoutes';
import PrivateRoutes from './routes/privateRoutes';

import appHandler from './utils/appComponentsHandler';
import appStore from './stores/appStore';

// public pages
import PublicHomePage from './pages/home/publicHomePage';
import SigninPage from './pages/auth/signinPage';
import SignupPage from './pages/auth/signupPage';
import SigninOTPPage from './pages/auth/signinOtpPage';
import ForgotPasswordPage from './pages/auth/forgotPasswordPage';
import ResetPasswordPage from './pages/auth/resetPasswordPage';
import SignedAccountsPage from './pages/auth/signedAccountsPage';

// private pages
import PrivateHomePage from './pages/home/privateHomePage';
// import WorkspaceHomePage from './pages/home/workspacesHomePage';

import FeaturesPage from './pages/feature/featuresPage';
import FeaturePage from './pages/feature/featurePage';
import FeatureCreatePage from './pages/feature/featureCreatePage';
import FeatureEditPage from './pages/feature/featureEditPage';

import RolesPage from './pages/role/rolesPage';
import RolePage from './pages/role/rolePage';
import RoleCreatePage from './pages/role/roleCreatePage';
import RoleEditPage from './pages/role/roleEditPage';

import RoleFeaturesPage from './pages/roleFeature/roleFeaturesPage';
import RoleFeaturesEditPage from './pages/roleFeature/roleFeaturesEditPage';

import AccountsPage from './pages/account/accountsPage';
import AccountCreatePage from './pages/account/accountCreatePage';
import AccountPage from './pages/account/accountPage';
import AccountEditPage from './pages/account/accountEditPage';

import AccountRolesPage from './pages/accountRole/accountRolesPage';
import AccountRolesEditPage from './pages/accountRole/accountRolesEditPage';

import AccountPasswordsPage from './pages/accountPassword/accountPasswordsPage';
import AccountPasswordCreatePage from './pages/accountPassword/accountPasswordCreatePage';

import AccountLimitedTransactionsPage from './pages/accountLimitedTransaction/accountLimitedTransactionsPage';
import AccountLimitedTransactionPage from './pages/accountLimitedTransaction/accountLimitedTransactionPage';
import AccountLimitedTransactionEditPage from './pages/accountLimitedTransaction/accountLimitedTransactionEditPage';

import AccountClientDevicesPage from './pages/accountClientDevice/accountClientDevicesPage';
import AccountClientDevicePage from './pages/accountClientDevice/accountClientDevicePage';
import AccountClientDeviceCreatePage from './pages/accountClientDevice/accountClientDeviceCreatePage';
import AccountClientDeviceEditPage from './pages/accountClientDevice/accountClientDeviceEditPage';

import AccountClientDeviceTokensPage from './pages/accountClientDeviceToken/accountClientDeviceTokensPage';
import AccountClientDeviceTokenPage from './pages/accountClientDeviceToken/accountClientDeviceTokenPage';
import AccountClientDeviceTokenCreatePage from './pages/accountClientDeviceToken/accountClientDeviceTokenCreatePage';
import AccountClientDeviceTokenEditPage from './pages/accountClientDeviceToken/accountClientDeviceTokenEditPage';

import AccountContactInfosPage from './pages/accountContactInfo/accountContactInfosPage';
import AccountContactInfoPage from './pages/accountContactInfo/accountContactInfoPage';
import AccountContactInfoEditPage from './pages/accountContactInfo/accountContactInfoEditPage';
import AccountContactInfoCreatePage from './pages/accountContactInfo/accountContactInfoCreatePage';

import AccountAccountInfosPage from './pages/accountAccountInfo/accountAccountInfosPage';
import AccountAccountInfoPage from './pages/accountAccountInfo/accountAccountInfoPage';
import AccountAccountInfoEditPage from './pages/accountAccountInfo/accountAccountInfoEditPage';
import AccountAccountInfoCreatePage from './pages/accountAccountInfo/accountAccountInfoCreatePage';

import AccountAccountConfigsPage from './pages/accountAccountConfig/accountAccountConfigsPage';
import AccountAccountConfigPage from './pages/accountAccountConfig/accountAccountConfigPage';
import AccountAccountConfigEditPage from './pages/accountAccountConfig/accountAccountConfigEditPage';

import AccountWorkspacesPage from './pages/accountWorkspace/accountWorkspacesPage';
import AccountWorkspacePage from './pages/accountWorkspace/accountWorkspacePage';
import AccountWorkspaceCreatePage from './pages/accountWorkspace/accountWorkspaceCreatePage';
import AccountWorkspaceEditPage from './pages/accountWorkspace/accountWorkspaceEditPage';

import AccountWorkspaceAccountRefsPage from './pages/accountWorkspaceAccountRef/accountWorkspaceAccountRefsPage';
import AccountWorkspaceAccountRefPage from './pages/accountWorkspaceAccountRef/accountWorkspaceAccountRefPage';
import AccountWorkspaceAccountRefCreatePage from './pages/accountWorkspaceAccountRef/accountWorkspaceAccountRefCreatePage';
import AccountWorkspaceAccountRefEditPage from './pages/accountWorkspaceAccountRef/accountWorkspaceAccountRefEditPage';


import OwnerPage from './pages/owner/ownerPage';
import OwnerEditPage from './pages/owner/ownerEditPage';
import OwnerAccountInfosPage from './pages/owner/ownerAccountInfosPage';
import OwnerAccountInfoCreatePage from './pages/owner/ownerAccountInfoCreatePage';
import OwnerAccountInfoEditPage from './pages/owner/ownerAccountInfoEditPage';
import OwnerAccountInfoPage from './pages/owner/ownerAccountInfoPage';

import OwnerAccountConfigsPage from './pages/owner/ownerAccountConfigsPage';
import OwnerAccountConfigEditPage from './pages/owner/ownerAccountConfigEditPage';
import OwnerAccountConfigPage from './pages/owner/ownerAccountConfigPage';

import OwnerContactInfosPage from './pages/owner/ownerContactInfosPage';
import OwnerContactInfoCreatePage from './pages/owner/ownerContactInfoCreatePage';
import OwnerContactInfoPage from './pages/owner/ownerContactInfoPage';
import OwnerContactInfoEditPage from './pages/owner/ownerContactInfoEditPage';
import OwnerRolesPage from './pages/owner/ownerRolesPage';
import OwnerLimitedTransactionsPage from './pages/owner/ownerLimitedTransactionsPage';
import OwnerLimitedTransactionPage from './pages/owner/ownerLimitedTransactionPage';
import OwnerLimitedTransactionEditPage from './pages/owner/ownerLimitedTransactionEditPage';
import OwnerPasswordsPage from './pages/owner/ownerPasswordsPage';
import OwnerPasswordCreatePage from './pages/owner/ownerPasswordCreatePage';
import OwnerClientDevicesPage from './pages/owner/ownerClientDevicesPage';
import OwnerClientDevicePage from './pages/owner/ownerClientDevicePage';
import OwnerClientDeviceCreatePage from './pages/owner/ownerClientDeviceCreatePage';
import OwnerClientDeviceEditPage from './pages/owner/ownerClientDeviceEditPage';
import OwnerClientDeviceTokensPage from './pages/owner/ownerClientDeviceTokensPage';
import OwnerClientDeviceTokenPage from './pages/owner/ownerClientDeviceTokenPage';
import OwnerClientDeviceTokenCreatePage from './pages/owner/ownerClientDeviceTokenCreatePage';
import OwnerClientDeviceTokenEditPage from './pages/owner/ownerClientDeviceTokenEditPage';
import OwnerWorkspacesPage from './pages/owner/ownerWorkspacesPage';
import OwnerWorkspacePage from './pages/owner/ownerWorkspacePage';
import OwnerWorkspaceCreatePage from './pages/owner/ownerWorkspaceCreatePage';
import OwnerWorkspaceEditPage from './pages/owner/ownerWorkspaceEditPage';
import OwnerWorkspaceAccountRefsPage from './pages/owner/ownerWorkspaceAccountRefsPage';
import OwnerWorkspaceAccountRefPage from './pages/owner/ownerWorkspaceAccountRefPage';
import OwnerWorkspaceAccountRefCreatePage from './pages/owner/ownerWorkspaceAccountRefCreatePage';
import OwnerWorkspaceAccountRefEditPage from './pages/owner/ownerWorkspaceAccountRefEditPage';

// register routes
//  for public routes
appHandler.addPublicRoute({url: 'index', page: PublicHomePage})
appHandler.addPublicRoute({url: 'signin', page: SigninPage})
appHandler.addPublicRoute({url: 'signup', page: SignupPage})
appHandler.addPublicRoute({url: 'signinOTP', page: SigninOTPPage})
appHandler.addPublicRoute({url: 'forgotPassword', page: ForgotPasswordPage})
appHandler.addPublicRoute({url: 'resetPassword', page: ResetPasswordPage})
appHandler.addPublicRoute({url: 'signedAccounts', page: SignedAccountsPage})
//  for private routes
appHandler.addPrivateRoute({url: 'index', page: PrivateHomePage })

// feature pages
appHandler.addPrivateRoute({url: 'features', page: FeaturesPage })
appHandler.addPrivateRoute({url: 'features/create', page: FeatureCreatePage })
appHandler.addPrivateRoute({url: 'features/view/:featureId', page: FeaturePage })
appHandler.addPrivateRoute({url: 'features/edit/:featureId', page: FeatureEditPage })

// role pages
appHandler.addPrivateRoute({url: 'roles', page: RolesPage })
appHandler.addPrivateRoute({url: 'roles/create', page: RoleCreatePage })
appHandler.addPrivateRoute({url: 'roles/view/:roleId', page: RolePage })
appHandler.addPrivateRoute({url: 'roles/edit/:roleId', page: RoleEditPage })
// role feature pages
appHandler.addPrivateRoute({url: 'roles/view/:roleId/features', page: RoleFeaturesPage })
appHandler.addPrivateRoute({url: 'roles/edit/:roleId/features', page: RoleFeaturesEditPage })

// account pages
appHandler.addPrivateRoute({url: 'accounts', page: AccountsPage })
appHandler.addPrivateRoute({url: 'accounts/create', page: AccountCreatePage })
appHandler.addPrivateRoute({url: 'accounts/view/:accountId', page: AccountPage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId', page: AccountEditPage })
// account roles
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/roles', page: AccountRolesPage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId/roles', page: AccountRolesEditPage })
// account passwords
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/passwords', page: AccountPasswordsPage })
appHandler.addPrivateRoute({url: 'accounts/create/:accountId/passwords', page: AccountPasswordCreatePage })
// account limited transactions
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/limitedTransactions', page: AccountLimitedTransactionsPage })
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/limitedTransactions/:limitedTransactionId', page: AccountLimitedTransactionPage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId/limitedTransactions/:limitedTransactionId', page: AccountLimitedTransactionEditPage })
// account client devices
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/clientDevices', page: AccountClientDevicesPage })
appHandler.addPrivateRoute({url: 'accounts/create/:accountId/clientDevices', page: AccountClientDeviceCreatePage })
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/clientDevices/:clientDeviceId', page: AccountClientDevicePage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId/clientDevices/:clientDeviceId', page: AccountClientDeviceEditPage })
// account client device tokens
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/clientDevices/:clientDeviceId/clientDeviceTokens', page: AccountClientDeviceTokensPage })
appHandler.addPrivateRoute({url: 'accounts/create/:accountId/clientDevices/:clientDeviceId/clientDeviceTokens', page: AccountClientDeviceTokenCreatePage })
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: AccountClientDeviceTokenPage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: AccountClientDeviceTokenEditPage })
// account contact infos
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/contactInfos', page: AccountContactInfosPage })
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/contactInfos/:contactInfoId', page: AccountContactInfoPage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId/contactInfos/:contactInfoId', page: AccountContactInfoEditPage })
appHandler.addPrivateRoute({url: 'accounts/create/:accountId/contactInfos', page: AccountContactInfoCreatePage })
// account account infos
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/accountInfos', page: AccountAccountInfosPage })
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/accountInfos/:accountInfoId', page: AccountAccountInfoPage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId/accountInfos/:accountInfoId', page: AccountAccountInfoEditPage })
appHandler.addPrivateRoute({url: 'accounts/create/:accountId/accountInfos', page: AccountAccountInfoCreatePage })
// account account configs
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/accountConfigs', page: AccountAccountConfigsPage })
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/accountConfigs/:accountConfigId', page: AccountAccountConfigPage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId/accountConfigs/:accountConfigId', page: AccountAccountConfigEditPage })
// account workspaces
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/workspaces', page: AccountWorkspacesPage })
appHandler.addPrivateRoute({url: 'accounts/create/:accountId/workspaces', page: AccountWorkspaceCreatePage })
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/workspaces/:workspaceId', page: AccountWorkspacePage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId/workspaces/:workspaceId', page: AccountWorkspaceEditPage })
// account workspace accountRefs
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/workspaces/:workspaceId/accountRefs', page: AccountWorkspaceAccountRefsPage })
appHandler.addPrivateRoute({url: 'accounts/create/:accountId/workspaces/:workspaceId/accountRefs', page: AccountWorkspaceAccountRefCreatePage })
appHandler.addPrivateRoute({url: 'accounts/view/:accountId/workspaces/:workspaceId/accountRefs/:accountRefId', page: AccountWorkspaceAccountRefPage })
appHandler.addPrivateRoute({url: 'accounts/edit/:accountId/workspaces/:workspaceId/accountRefs/:accountRefId', page: AccountWorkspaceAccountRefEditPage })

// owner pages
appHandler.addPrivateRoute({url: 'owner/view', page: OwnerPage })
appHandler.addPrivateRoute({url: 'owner/edit', page: OwnerEditPage })
// owner account info
appHandler.addPrivateRoute({url: 'owner/view/accountInfos', page: OwnerAccountInfosPage })
appHandler.addPrivateRoute({url: 'owner/create/accountInfos', page: OwnerAccountInfoCreatePage })
appHandler.addPrivateRoute({url: 'owner/view/accountInfos/:accountInfoId', page: OwnerAccountInfoPage })
appHandler.addPrivateRoute({url: 'owner/edit/accountInfos/:accountInfoId', page: OwnerAccountInfoEditPage })
// owner account config
appHandler.addPrivateRoute({url: 'owner/view/accountConfigs', page: OwnerAccountConfigsPage })
appHandler.addPrivateRoute({url: 'owner/view/accountConfigs/:accountConfigId', page: OwnerAccountConfigPage })
appHandler.addPrivateRoute({url: 'owner/edit/accountConfigs/:accountConfigId', page: OwnerAccountConfigEditPage })
// owner contact info
appHandler.addPrivateRoute({url: 'owner/view/contactInfos', page: OwnerContactInfosPage })
appHandler.addPrivateRoute({url: 'owner/create/contactInfos', page: OwnerContactInfoCreatePage })
appHandler.addPrivateRoute({url: 'owner/view/contactInfos/:contactInfoId', page: OwnerContactInfoPage })
appHandler.addPrivateRoute({url: 'owner/edit/contactInfos/:contactInfoId', page: OwnerContactInfoEditPage })
// owner roles
appHandler.addPrivateRoute({url: 'owner/view/roles', page: OwnerRolesPage })
// owner limited transaction
appHandler.addPrivateRoute({url: 'owner/view/limitedTransactions', page: OwnerLimitedTransactionsPage })
appHandler.addPrivateRoute({url: 'owner/view/limitedTransactions/:limitedTransactionId', page: OwnerLimitedTransactionPage })
appHandler.addPrivateRoute({url: 'owner/edit/limitedTransactions/:limitedTransactionId', page: OwnerLimitedTransactionEditPage })
// owner password
appHandler.addPrivateRoute({url: 'owner/view/passwords', page: OwnerPasswordsPage })
appHandler.addPrivateRoute({url: 'owner/create/passwords', page: OwnerPasswordCreatePage })
// owner client devices
appHandler.addPrivateRoute({url: 'owner/view/clientDevices', page: OwnerClientDevicesPage })
appHandler.addPrivateRoute({url: 'owner/create/clientDevices', page: OwnerClientDeviceCreatePage })
appHandler.addPrivateRoute({url: 'owner/view/clientDevices/:clientDeviceId', page: OwnerClientDevicePage })
appHandler.addPrivateRoute({url: 'owner/edit/clientDevices/:clientDeviceId', page: OwnerClientDeviceEditPage })
// owner client device tokens
appHandler.addPrivateRoute({url: 'owner/view/clientDevices/:clientDeviceId/clientDeviceTokens', page: OwnerClientDeviceTokensPage })
appHandler.addPrivateRoute({url: 'owner/create/clientDevices/:clientDeviceId/clientDeviceTokens', page: OwnerClientDeviceTokenCreatePage })
appHandler.addPrivateRoute({url: 'owner/view/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: OwnerClientDeviceTokenPage })
appHandler.addPrivateRoute({url: 'owner/edit/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: OwnerClientDeviceTokenEditPage })
// owner workspaces
appHandler.addPrivateRoute({url: 'owner/view/workspaces', page: OwnerWorkspacesPage })
appHandler.addPrivateRoute({url: 'owner/create/workspaces', page: OwnerWorkspaceCreatePage })
appHandler.addPrivateRoute({url: 'owner/view/workspaces/:workspaceId', page: OwnerWorkspacePage })
appHandler.addPrivateRoute({url: 'owner/edit/workspaces/:workspaceId', page: OwnerWorkspaceEditPage })
// owner workspace accountRefs
appHandler.addPrivateRoute({url: 'owner/view/workspaces/:workspaceId/accountRefs', page: OwnerWorkspaceAccountRefsPage })
appHandler.addPrivateRoute({url: 'owner/create/workspaces/:workspaceId/accountRefs', page: OwnerWorkspaceAccountRefCreatePage })
appHandler.addPrivateRoute({url: 'owner/view/workspaces/:workspaceId/accountRefs/:accountRefId', page: OwnerWorkspaceAccountRefPage })
appHandler.addPrivateRoute({url: 'owner/edit/workspaces/:workspaceId/accountRefs/:accountRefId', page: OwnerWorkspaceAccountRefEditPage })

// add items to main drawers
appHandler.addMainDrawer({
  label: 'Account Data',
  links:  [
      { label: 'Dashboard', url: '/', Icon: HomeIcon },
      { label: 'Notes', url: '/notes', Icon: NotesIcon },
      { label: 'Tasks', url: '/tasks', Icon: TaskIcon }
  ]
})

appHandler.addMainDrawer({
  label: 'Global Data',
  links:  [
      { label: 'Features', url: '/features', Icon: FeaturedPlayListIcon },
      { label: 'Roles', url: '/roles', Icon: AdminPanelSettingsIcon },
      { label: 'Accounts', url: '/accounts', Icon: PeopleIcon }
  ]
})

// add items to account drawers
// for public
appHandler.addPublicUserDrawerNav({
  label: 'Info Pages',
  links: [
      { label: 'Home', url: '/', Icon: HomeIcon },
  ]
})
appHandler.addPublicUserDrawerNav({
  label: 'Auth Pages',
  links: [
      { label: 'Signin', url: '/signin', Icon: LockOutlinedIcon },
      { label: 'Signin OTP', url: '/signinOTP', Icon: KeyIcon },
      { label: 'Signup', url: '/signup', Icon: AccountBoxOutlinedIcon },
      { label: 'Forgot Password', url: '/forgotPassword', Icon: KeyOffOutlinedIcon },
      { label: 'Reset Password', url: '/resetPassword', Icon: LockResetOutlinedIcon },
      { label: 'Signed Accounts', url: '/signedAccounts', Icon: GroupIcon }
  ]
})
// for private
appHandler.addPrivateUserDrawerNav({
  label: 'Custom Actions',
  links: [
      { label: 'Test Link', url: '/test-link', Icon: LockOutlinedIcon },
      {
        label: 'Test Action',
        action: () => {
          console.log('do some actions!!')
        },
        Icon: AccountBoxOutlinedIcon
      },
  ]
})

function App() {
  const apptheme = useAppSelector(state => state?.appRefs.appTheme)
  const isSignedIn = useAppSelector(state => state?.signedInAccount?.isSignedIn)
  const dispatch = useAppDispatch()
  const finalTheme = useCallback(() => {
    const defaultTheme = appHandler.appConfig.AppThemeConfig || {}
    defaultTheme['palette'] = {
      ...(defaultTheme['palette'] || {}),
      ...{mode: apptheme}
    }
  
    return defaultTheme
  }, [apptheme])
  const themeConfiguration = createTheme(finalTheme())

  useEffect(() => {
    (async () => {
      console.log('init app')
      const authToken = localStorage.getItem(appHandler.appConfig.TokenKey) || undefined
      // use the auth token from local storage on every private api request
      apiHelper.useToken(authToken)
      // set document title
      document.title = appHandler.appConfig.AppName

      // sytem theme change event
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
            const sysTheme = event.matches ? 'dark' : 'light'
            dispatch(setAppRefs({appTheme: sysTheme}))
            localStorage.setItem(appHandler.appConfig.AppThemeKey, sysTheme)
            // console.log('changed!', sysTheme)
        })

      try {
        await appUtils.loadSigninAccountData()
        await appUtils.loadAppRefsData()

        // !! should be disabled sync features enable only when synching
        // !! temporary enabled
        // await appHandler.syncToFeatures() // !!! please disable this line, only use this in developement

      } catch (err) {
        console.log('Not authorized to fetch app data references')
      }
    })()
  }, [dispatch])

  return (
    <ThemeProvider theme={themeConfiguration}>
      <CssBaseline />
      {
        isSignedIn === undefined? <InitialDisplay />:isSignedIn? <PrivateRoutes />: <PublicRoutes />
      }
    </ThemeProvider>
    
  )
}

export {
  appStore,
  appHandler
}
export default App;
