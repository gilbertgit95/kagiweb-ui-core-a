import React, {useEffect, useCallback} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import NotesIcon from '@mui/icons-material/Notes';
import TaskIcon from '@mui/icons-material/Task';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyIcon from '@mui/icons-material/Key';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

import CssBaseline from '@mui/material/CssBaseline';
import apiHelper from './dataEndpoints/apiCoreA/apiHelper';
import { useAppDispatch, useAppSelector} from './stores/appStore';
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

// private pages
import PrivateHomePage from './pages/home/privateHomePage';
import WorkspaceHomePage from './pages/home/workspacesHomePage';

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

import UsersPage from './pages/user/usersPage';
import UserCreatePage from './pages/user/userCreatePage';
import UserPage from './pages/user/userPage';
import UserEditPage from './pages/user/userEditPage';

import UserRolesPage from './pages/userRole/userRolesPage';
import UserRolesEditPage from './pages/userRole/userRolesEditPage';

import UserPasswordsPage from './pages/userPassword/userPasswordsPage';
import UserPasswordCreatePage from './pages/userPassword/userPasswordCreatePage';

import UserLimitedTransactionsPage from './pages/userLimitedTransaction/userLimitedTransactionsPage';
import UserLimitedTransactionPage from './pages/userLimitedTransaction/userLimitedTransactionPage';
import UserLimitedTransactionEditPage from './pages/userLimitedTransaction/userLimitedTransactionEditPage';

import UserClientDevicesPage from './pages/userClientDevice/userClientDevicesPage';
import UserClientDevicePage from './pages/userClientDevice/userClientDevicePage';
import UserClientDeviceCreatePage from './pages/userClientDevice/userClientDeviceCreatePage';
import UserClientDeviceEditPage from './pages/userClientDevice/userClientDeviceEditPage';

import UserClientDeviceTokensPage from './pages/userClientDeviceToken/userClientDeviceTokensPage';
import UserClientDeviceTokenPage from './pages/userClientDeviceToken/userClientDeviceTokenPage';
import UserClientDeviceTokenCreatePage from './pages/userClientDeviceToken/userClientDeviceTokenCreatePage';
import UserClientDeviceTokenEditPage from './pages/userClientDeviceToken/userClientDeviceTokenEditPage';

import UserContactInfosPage from './pages/userContactInfo/userContactInfosPage';
import UserContactInfoPage from './pages/userContactInfo/userContactInfoPage';
import UserContactInfoEditPage from './pages/userContactInfo/userContactInfoEditPage';
import UserContactInfoCreatePage from './pages/userContactInfo/userContactInfoCreatePage';

import UserUserInfosPage from './pages/userUserInfo/userUserInfosPage';
import UserUserInfoPage from './pages/userUserInfo/userUserInfoPage';
import UserUserInfoEditPage from './pages/userUserInfo/userUserInfoEditPage';
import UserUserInfoCreatePage from './pages/userUserInfo/userUserInfoCreatePage';

import UserWorkspacesPage from './pages/userWorkspace/userWorkspacesPage';
import UserWorkspacePage from './pages/userWorkspace/userWorkspacePage';
import UserWorkspaceCreatePage from './pages/userWorkspace/userWorkspaceCreatePage';
import UserWorkspaceEditPage from './pages/userWorkspace/userWorkspaceEditPage';

import UserWorkspaceUserRefsPage from './pages/userWorkspaceUserRef/userWorkspaceUserRefsPage';
import UserWorkspaceUserRefPage from './pages/userWorkspaceUserRef/userWorkspaceUserRefPage';
import UserWorkspaceUserRefCreatePage from './pages/userWorkspaceUserRef/userWorkspaceUserRefCreatePage';
import UserWorkspaceUserRefEditPage from './pages/userWorkspaceUserRef/userWorkspaceUserRefEditPage';


import OwnerPage from './pages/owner/ownerPage';
import OwnerEditPage from './pages/owner/ownerEditPage';
import OwnerUserInfosPage from './pages/owner/ownerUserInfosPage';
import OwnerUserInfoCreatePage from './pages/owner/ownerUserInfoCreatePage';
import OwnerUserInfoEditPage from './pages/owner/ownerUserInfoEditPage';
import OwnerUserInfoPage from './pages/owner/ownerUserInfoPage';
import OwnerContactInfosPage from './pages/owner/ownerContactInfosPage';
import OwnerContactInfoCreatePage from './pages/owner/ownerContactInfoCreatePage';
import OwnerContactInfoPage from './pages/owner/ownerContactInfoPage';
import OwnerContactInfoEditPage from './pages/owner/ownerContactInfoEditPage';
import OwnerRolesPage from './pages/owner/ownerRolesPage';
import OwnerRolesEditPage from './pages/owner/ownerRolesEditPage';
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
import OwnerWorkspaceUserRefsPage from './pages/owner/ownerWorkspaceUserRefsPage';
import OwnerWorkspaceUserRefPage from './pages/owner/ownerWorkspaceUserRefPage';
import OwnerWorkspaceUserRefCreatePage from './pages/owner/ownerWorkspaceUserRefCreatePage';
import OwnerWorkspaceUserRefEditPage from './pages/owner/ownerWorkspaceUserRefEditPage';

// register routes
//  for public routes
appHandler.addPublicRoute({url: 'index', page: PublicHomePage})
appHandler.addPublicRoute({url: 'signin', page: SigninPage})
appHandler.addPublicRoute({url: 'signup', page: SignupPage})
appHandler.addPublicRoute({url: 'signinOTP', page: SigninOTPPage})
appHandler.addPublicRoute({url: 'forgotPassword', page: ForgotPasswordPage})
appHandler.addPublicRoute({url: 'resetPassword', page: ResetPasswordPage})
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

// user pages
appHandler.addPrivateRoute({url: 'users', page: UsersPage })
appHandler.addPrivateRoute({url: 'users/create', page: UserCreatePage })
appHandler.addPrivateRoute({url: 'users/view/:userId', page: UserPage })
appHandler.addPrivateRoute({url: 'users/edit/:userId', page: UserEditPage })
// user roles
appHandler.addPrivateRoute({url: 'users/view/:userId/roles', page: UserRolesPage })
appHandler.addPrivateRoute({url: 'users/edit/:userId/roles', page: UserRolesEditPage })
// user passwords
appHandler.addPrivateRoute({url: 'users/view/:userId/passwords', page: UserPasswordsPage })
appHandler.addPrivateRoute({url: 'users/create/:userId/passwords', page: UserPasswordCreatePage })
// user limited transactions
appHandler.addPrivateRoute({url: 'users/view/:userId/limitedTransactions', page: UserLimitedTransactionsPage })
appHandler.addPrivateRoute({url: 'users/view/:userId/limitedTransactions/:limitedTransactionId', page: UserLimitedTransactionPage })
appHandler.addPrivateRoute({url: 'users/edit/:userId/limitedTransactions/:limitedTransactionId', page: UserLimitedTransactionEditPage })
// user client devices
appHandler.addPrivateRoute({url: 'users/view/:userId/clientDevices', page: UserClientDevicesPage })
appHandler.addPrivateRoute({url: 'users/create/:userId/clientDevices', page: UserClientDeviceCreatePage })
appHandler.addPrivateRoute({url: 'users/view/:userId/clientDevices/:clientDeviceId', page: UserClientDevicePage })
appHandler.addPrivateRoute({url: 'users/edit/:userId/clientDevices/:clientDeviceId', page: UserClientDeviceEditPage })
// user client device tokens
appHandler.addPrivateRoute({url: 'users/view/:userId/clientDevices/:clientDeviceId/clientDeviceTokens', page: UserClientDeviceTokensPage })
appHandler.addPrivateRoute({url: 'users/create/:userId/clientDevices/:clientDeviceId/clientDeviceTokens', page: UserClientDeviceTokenCreatePage })
appHandler.addPrivateRoute({url: 'users/view/:userId/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: UserClientDeviceTokenPage })
appHandler.addPrivateRoute({url: 'users/edit/:userId/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: UserClientDeviceTokenEditPage })
// user contact infos
appHandler.addPrivateRoute({url: 'users/view/:userId/contactInfos', page: UserContactInfosPage })
appHandler.addPrivateRoute({url: 'users/view/:userId/contactInfos/:contactInfoId', page: UserContactInfoPage })
appHandler.addPrivateRoute({url: 'users/edit/:userId/contactInfos/:contactInfoId', page: UserContactInfoEditPage })
appHandler.addPrivateRoute({url: 'users/create/:userId/contactInfos', page: UserContactInfoCreatePage })
// user user infos
appHandler.addPrivateRoute({url: 'users/view/:userId/userInfos', page: UserUserInfosPage })
appHandler.addPrivateRoute({url: 'users/view/:userId/userInfos/:userInfoId', page: UserUserInfoPage })
appHandler.addPrivateRoute({url: 'users/edit/:userId/userInfos/:userInfoId', page: UserUserInfoEditPage })
appHandler.addPrivateRoute({url: 'users/create/:userId/userInfos', page: UserUserInfoCreatePage })
// user workspaces
appHandler.addPrivateRoute({url: 'users/view/:userId/workspaces', page: UserWorkspacesPage })
appHandler.addPrivateRoute({url: 'users/create/:userId/workspaces', page: UserWorkspaceCreatePage })
appHandler.addPrivateRoute({url: 'users/view/:userId/workspaces/:workspaceId', page: UserWorkspacePage })
appHandler.addPrivateRoute({url: 'users/edit/:userId/workspaces/:workspaceId', page: UserWorkspaceEditPage })
// user workspace userRefs
appHandler.addPrivateRoute({url: 'users/view/:userId/workspaces/:workspaceId/userRefs', page: UserWorkspaceUserRefsPage })
appHandler.addPrivateRoute({url: 'users/create/:userId/workspaces/:workspaceId/userRefs', page: UserWorkspaceUserRefCreatePage })
appHandler.addPrivateRoute({url: 'users/view/:userId/workspaces/:workspaceId/userRefs/:userRefId', page: UserWorkspaceUserRefPage })
appHandler.addPrivateRoute({url: 'users/edit/:userId/workspaces/:workspaceId/userRefs/:userRefId', page: UserWorkspaceUserRefEditPage })

// owner pages
appHandler.addPrivateRoute({url: 'owner/view', page: OwnerPage })
appHandler.addPrivateRoute({url: 'owner/edit', page: OwnerEditPage })
// owner user info
appHandler.addPrivateRoute({url: 'owner/view/userInfos', page: OwnerUserInfosPage })
appHandler.addPrivateRoute({url: 'owner/create/userInfos', page: OwnerUserInfoCreatePage })
appHandler.addPrivateRoute({url: 'owner/view/userInfos/:userInfoId', page: OwnerUserInfoPage })
appHandler.addPrivateRoute({url: 'owner/edit/userInfos/:userInfoId', page: OwnerUserInfoEditPage })
// owner contact info
appHandler.addPrivateRoute({url: 'owner/view/contactInfos', page: OwnerContactInfosPage })
appHandler.addPrivateRoute({url: 'owner/create/contactInfos', page: OwnerContactInfoCreatePage })
appHandler.addPrivateRoute({url: 'owner/view/contactInfos/:contactInfoId', page: OwnerContactInfoPage })
appHandler.addPrivateRoute({url: 'owner/edit/contactInfos/:contactInfoId', page: OwnerContactInfoEditPage })
// owner roles
appHandler.addPrivateRoute({url: 'owner/view/roles', page: OwnerRolesPage })
appHandler.addPrivateRoute({url: 'owner/edit/roles', page: OwnerRolesEditPage })
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
// owner workspace userRefs
appHandler.addPrivateRoute({url: 'owner/view/workspaces/:workspaceId/userRefs', page: OwnerWorkspaceUserRefsPage })
appHandler.addPrivateRoute({url: 'owner/create/workspaces/:workspaceId/userRefs', page: OwnerWorkspaceUserRefCreatePage })
appHandler.addPrivateRoute({url: 'owner/view/workspaces/:workspaceId/userRefs/:userRefId', page: OwnerWorkspaceUserRefPage })
appHandler.addPrivateRoute({url: 'owner/edit/workspaces/:workspaceId/userRefs/:userRefId', page: OwnerWorkspaceUserRefEditPage })

// workspace data
appHandler.addPrivateRoute({url: 'workspaces/view/:workspaceId', page: WorkspaceHomePage })

// add items to main drawers
appHandler.addMainDrawer({
  label: 'Workspace Data',
  links:  [
      { label: 'Workspace Dash*', url: '/workspaces/view/none', Icon: HomeIcon },
      { label: 'Products*', url: '/', Icon: HomeIcon }
  ]
})
appHandler.addMainDrawer({
  label: 'User Data',
  links:  [
      { label: 'Home', url: '/', Icon: HomeIcon },
      { label: 'Notes*', url: '/notes', Icon: NotesIcon },
      { label: 'Tasks*', url: '/tasks', Icon: TaskIcon },
      { label: 'Notifications*', url: '/notifications', Icon: NotificationsIcon }
  ]
})
appHandler.addMainDrawer({
  label: 'Global Data',
  links:  [
      { label: 'Features', url: '/features', Icon: FeaturedPlayListIcon },
      { label: 'Roles', url: '/roles', Icon: AdminPanelSettingsIcon },
      { label: 'Users', url: '/users', Icon: PeopleIcon }
  ]
})

// add items to user drawers
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
      { label: 'Reset Password', url: '/resetPassword', Icon: LockResetOutlinedIcon }
  ]
})
// for private
appHandler.addPrivateUserDrawerNav({
  label: 'Custom Actions',
  links: [
      { label: 'Signin', url: '/signin', Icon: LockOutlinedIcon },
      { label: 'Signin OTP', url: '/signinOTP', Icon: KeyIcon },
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
  const isSignedIn = useAppSelector(state => state?.signedInUser?.isSignedIn)
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

      try {
        await appUtils.loadSigninUserData()
        await appUtils.loadAppRefsData()
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
