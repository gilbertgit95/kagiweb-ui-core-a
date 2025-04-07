import React, {useEffect, useCallback} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import ComputerIcon from '@mui/icons-material/Computer';
// import NotesIcon from '@mui/icons-material/Notes';
// import TaskIcon from '@mui/icons-material/Task';
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
import SystemPage from './pages/system/systemPage'

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

import AccountAccountRefsPage from './pages/accountAccountRef/accountAccountRefsPage';
import AccountAccountRefPage from './pages/accountAccountRef/accountAccountRefPage';
import AccountAccountRefCreatePage from './pages/accountAccountRef/accountAccountRefCreatePage';
import AccountAccountRefEditPage from './pages/accountAccountRef/accountAccountRefEditPage';

import AccountAccountRefRolesPage from './pages/accountAccountRefRole/accountAccountRefRolesPage';
import AccountAccountRefRolesEditPage from './pages/accountAccountRefRole/accountAccountRefRolesEditPage';

import AccountAccountRefAccountConfigsPage from './pages/accountAccountRefAccountConfig/accountAccountRefAccountConfigsPage';
import AccountAccountRefAccountConfigPage from './pages/accountAccountRefAccountConfig/accountAccountRefAccountConfigPage';
import AccountAccountRefAccountConfigEditPage from './pages/accountAccountRefAccountConfig/accountAccountRefAccountConfigEditPage';

import AccountWorkspacesPage from './pages/accountWorkspace/accountWorkspacesPage';
import AccountWorkspacePage from './pages/accountWorkspace/accountWorkspacePage';
import AccountWorkspaceCreatePage from './pages/accountWorkspace/accountWorkspaceCreatePage';
import AccountWorkspaceEditPage from './pages/accountWorkspace/accountWorkspaceEditPage';

import AccountWorkspaceAccountRefsPage from './pages/accountWorkspaceAccountRef/accountWorkspaceAccountRefsPage';
import AccountWorkspaceAccountRefPage from './pages/accountWorkspaceAccountRef/accountWorkspaceAccountRefPage';
import AccountWorkspaceAccountRefCreatePage from './pages/accountWorkspaceAccountRef/accountWorkspaceAccountRefCreatePage';
import AccountWorkspaceAccountRefEditPage from './pages/accountWorkspaceAccountRef/accountWorkspaceAccountRefEditPage';

import AccountWorkspaceAccountRefRolesPage from './pages/accountWorkspaceAccountRefRole/accountWorkspaceAccountRefRolesPage';
import AccountWorkspaceAccountRefRolesEditPage from './pages/accountWorkspaceAccountRefRole/accountWorkspaceAccountRefRolesEditPage';

import AccountWorkspaceAccountRefAccountConfigsPage from './pages/accountWorkspaceAccountRefAccountConfig/accountWorkspaceAccountRefAccountConfigsPage';
import AccountWorkspaceAccountRefAccountConfigPage from './pages/accountWorkspaceAccountRefAccountConfig/accountWorkspaceAccountRefAccountConfigPage';
import AccountWorkspaceAccountRefAccountConfigEditPage from './pages/accountWorkspaceAccountRefAccountConfig/accountWorkspaceAccountRefAccountConfigEditPage';

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
import OwnerAccountRefsPage from './pages/owner/ownerAccountRefsPage';
import OwnerAccountRefPage from './pages/owner/ownerAccountRefPage';
import OwnerAccountRefCreatePage from './pages/owner/ownerAccountRefCreatePage';
import OwnerAccountRefEditPage from './pages/owner/ownerAccountRefEditPage';
import OwnerAccountRefRolesPage from './pages/owner/ownerAccountRefRolesPage';
import OwnerAccountRefAccountConfigsPage from './pages/owner/ownerAccountRefAccountConfigsPage';
import OwnerAccountRefAccountConfigPage from './pages/owner/ownerAccountRefAccountConfigPage';
import OwnerAccountRefAccountConfigEditPage from './pages/owner/ownerAccountRefAccountConfigEditPage';
import OwnerWorkspacesPage from './pages/owner/ownerWorkspacesPage';
import OwnerWorkspacePage from './pages/owner/ownerWorkspacePage';
import OwnerWorkspaceCreatePage from './pages/owner/ownerWorkspaceCreatePage';
import OwnerWorkspaceEditPage from './pages/owner/ownerWorkspaceEditPage';
import OwnerWorkspaceAccountRefsPage from './pages/owner/ownerWorkspaceAccountRefsPage';
import OwnerWorkspaceAccountRefPage from './pages/owner/ownerWorkspaceAccountRefPage';
import OwnerWorkspaceAccountRefCreatePage from './pages/owner/ownerWorkspaceAccountRefCreatePage';
import OwnerWorkspaceAccountRefEditPage from './pages/owner/ownerWorkspaceAccountRefEditPage';
import OwnerWorkspaceAccountRefRolesPage from './pages/owner/ownerWorkspaceAccountRefRolesPage';
import OwnerWorkspaceAccountRefAccountConfigsPage from './pages/owner/ownerWorkspaceAccountRefAccountConfigsPage';
import OwnerWorkspaceAccountRefAccountConfigPage from './pages/owner/ownerWorkspaceAccountRefAccountConfigPage';
import OwnerWorkspaceAccountRefAccountConfigEditPage from './pages/owner/ownerWorkspaceAccountRefAccountConfigEditPage';

import AccountNotificationsPage from './pages/notification/accountNotificationsPage';
import OwnerNotificationsPage from './pages/notification/ownerNotificationsPage';

import AccountAccountActionPage from './pages/actions/accountAccountActionPage';
import AccountAccountWorkspaceActionPage from './pages/actions/accountAccountWorkspaceActionPage';
import OwnerAccountActionPage from './pages/actions/ownerAccountActionPage';
import OwnerAccountWorkspaceActionPage from './pages/actions/ownerAccountWorkspaceActionPage';

// register routes
//  for public routes
appHandler.addRoute({url: 'index', page: PublicHomePage}, 'publicRoutes')
appHandler.addRoute({url: 'signin', page: SigninPage}, 'publicRoutes')
appHandler.addRoute({url: 'signup', page: SignupPage}, 'publicRoutes')
appHandler.addRoute({url: 'signinOTP', page: SigninOTPPage}, 'publicRoutes')
appHandler.addRoute({url: 'forgotPassword', page: ForgotPasswordPage}, 'publicRoutes')
appHandler.addRoute({url: 'resetPassword', page: ResetPasswordPage}, 'publicRoutes')
appHandler.addRoute({url: 'signedAccounts', page: SignedAccountsPage}, 'publicRoutes')


//  for private routes
appHandler.addRoute({url: 'index', page: PrivateHomePage }, 'privateRoutes')

// system
appHandler.addRoute({url: 'system', page: SystemPage }, 'privateRoutes')

// feature pages
appHandler.addRoute({url: 'features', page: FeaturesPage }, 'privateRoutes')
appHandler.addRoute({url: 'features/create', page: FeatureCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'features/view/:featureId', page: FeaturePage }, 'privateRoutes')
appHandler.addRoute({url: 'features/edit/:featureId', page: FeatureEditPage }, 'privateRoutes')

// role pages
appHandler.addRoute({url: 'roles', page: RolesPage }, 'privateRoutes')
appHandler.addRoute({url: 'roles/create', page: RoleCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'roles/view/:roleId', page: RolePage }, 'privateRoutes')
appHandler.addRoute({url: 'roles/edit/:roleId', page: RoleEditPage }, 'privateRoutes')
// role feature pages
appHandler.addRoute({url: 'roles/view/:roleId/features', page: RoleFeaturesPage }, 'privateRoutes')
appHandler.addRoute({url: 'roles/edit/:roleId/features', page: RoleFeaturesEditPage }, 'privateRoutes')

// account pages
appHandler.addRoute({url: 'accounts', page: AccountsPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/create', page: AccountCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId', page: AccountPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId', page: AccountEditPage }, 'privateRoutes')
// account roles
appHandler.addRoute({url: 'accounts/view/:accountId/roles', page: AccountRolesPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/roles', page: AccountRolesEditPage }, 'privateRoutes')
// account passwords
appHandler.addRoute({url: 'accounts/view/:accountId/passwords', page: AccountPasswordsPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/create/:accountId/passwords', page: AccountPasswordCreatePage }, 'privateRoutes')
// account limited transactions
appHandler.addRoute({url: 'accounts/view/:accountId/limitedTransactions', page: AccountLimitedTransactionsPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/limitedTransactions/:limitedTransactionId', page: AccountLimitedTransactionPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/limitedTransactions/:limitedTransactionId', page: AccountLimitedTransactionEditPage }, 'privateRoutes')
// account client devices
appHandler.addRoute({url: 'accounts/view/:accountId/clientDevices', page: AccountClientDevicesPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/create/:accountId/clientDevices', page: AccountClientDeviceCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/clientDevices/:clientDeviceId', page: AccountClientDevicePage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/clientDevices/:clientDeviceId', page: AccountClientDeviceEditPage }, 'privateRoutes')
// account client device tokens
appHandler.addRoute({url: 'accounts/view/:accountId/clientDevices/:clientDeviceId/clientDeviceTokens', page: AccountClientDeviceTokensPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/create/:accountId/clientDevices/:clientDeviceId/clientDeviceTokens', page: AccountClientDeviceTokenCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: AccountClientDeviceTokenPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: AccountClientDeviceTokenEditPage }, 'privateRoutes')
// account contact infos
appHandler.addRoute({url: 'accounts/view/:accountId/contactInfos', page: AccountContactInfosPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/contactInfos/:contactInfoId', page: AccountContactInfoPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/contactInfos/:contactInfoId', page: AccountContactInfoEditPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/create/:accountId/contactInfos', page: AccountContactInfoCreatePage }, 'privateRoutes')
// account account infos
appHandler.addRoute({url: 'accounts/view/:accountId/accountInfos', page: AccountAccountInfosPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/accountInfos/:accountInfoId', page: AccountAccountInfoPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/accountInfos/:accountInfoId', page: AccountAccountInfoEditPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/create/:accountId/accountInfos', page: AccountAccountInfoCreatePage }, 'privateRoutes')
// account account configs
appHandler.addRoute({url: 'accounts/view/:accountId/accountConfigs', page: AccountAccountConfigsPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/accountConfigs/:accountConfigId', page: AccountAccountConfigPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/accountConfigs/:accountConfigId', page: AccountAccountConfigEditPage }, 'privateRoutes')
// account account accountRefs
appHandler.addRoute({url: 'accounts/view/:accountId/accountRefs', page: AccountAccountRefsPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/create/:accountId/accountRefs', page: AccountAccountRefCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/accountRefs/:accountRefId', page: AccountAccountRefPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/accountRefs/:accountRefId', page: AccountAccountRefEditPage }, 'privateRoutes')
// account account accountRefs account configs
appHandler.addRoute({url: 'accounts/view/:accountId/accountRefs/:accountRefId/accountConfigs', page: AccountAccountRefAccountConfigsPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/accountRefs/:accountRefId/accountConfigs/:accountConfigId', page: AccountAccountRefAccountConfigPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/accountRefs/:accountRefId/accountConfigs/:accountConfigId', page: AccountAccountRefAccountConfigEditPage }, 'privateRoutes')
// account account accountRefs roles
appHandler.addRoute({url: 'accounts/view/:accountId/accountRefs/:accountRefId/roles', page: AccountAccountRefRolesPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/accountRefs/:accountRefId/roles', page: AccountAccountRefRolesEditPage }, 'privateRoutes')

// account workspaces
appHandler.addRoute({url: 'accounts/view/:accountId/workspaces', page: AccountWorkspacesPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/create/:accountId/workspaces', page: AccountWorkspaceCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/workspaces/:workspaceId', page: AccountWorkspacePage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/workspaces/:workspaceId', page: AccountWorkspaceEditPage }, 'privateRoutes')
// account workspace accountRefs
appHandler.addRoute({url: 'accounts/view/:accountId/workspaces/:workspaceId/accountRefs', page: AccountWorkspaceAccountRefsPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/create/:accountId/workspaces/:workspaceId/accountRefs', page: AccountWorkspaceAccountRefCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/workspaces/:workspaceId/accountRefs/:accountRefId', page: AccountWorkspaceAccountRefPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/workspaces/:workspaceId/accountRefs/:accountRefId', page: AccountWorkspaceAccountRefEditPage }, 'privateRoutes')
// account workspace accountRefs account configs
appHandler.addRoute({url: 'accounts/view/:accountId/workspaces/:workspaceId/accountRefs/:accountRefId/accountConfigs', page: AccountWorkspaceAccountRefAccountConfigsPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/workspaces/:workspaceId/accountRefs/:accountRefId/accountConfigs/:accountConfigId', page: AccountWorkspaceAccountRefAccountConfigPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/workspaces/:workspaceId/accountRefs/:accountRefId/accountConfigs/:accountConfigId', page: AccountWorkspaceAccountRefAccountConfigEditPage }, 'privateRoutes')
// account workspace accountRefs roles
appHandler.addRoute({url: 'accounts/view/:accountId/workspaces/:workspaceId/accountRefs/:accountRefId/roles', page: AccountWorkspaceAccountRefRolesPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/edit/:accountId/workspaces/:workspaceId/accountRefs/:accountRefId/roles', page: AccountWorkspaceAccountRefRolesEditPage }, 'privateRoutes')

// owner pages
appHandler.addRoute({url: 'owner/view', page: OwnerPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit', page: OwnerEditPage }, 'privateRoutes')
// owner account info
appHandler.addRoute({url: 'owner/view/accountInfos', page: OwnerAccountInfosPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/create/accountInfos', page: OwnerAccountInfoCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/accountInfos/:accountInfoId', page: OwnerAccountInfoPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/accountInfos/:accountInfoId', page: OwnerAccountInfoEditPage }, 'privateRoutes')
// owner account config
appHandler.addRoute({url: 'owner/view/accountConfigs', page: OwnerAccountConfigsPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/accountConfigs/:accountConfigId', page: OwnerAccountConfigPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/accountConfigs/:accountConfigId', page: OwnerAccountConfigEditPage }, 'privateRoutes')
// owner contact info
appHandler.addRoute({url: 'owner/view/contactInfos', page: OwnerContactInfosPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/create/contactInfos', page: OwnerContactInfoCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/contactInfos/:contactInfoId', page: OwnerContactInfoPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/contactInfos/:contactInfoId', page: OwnerContactInfoEditPage }, 'privateRoutes')
// owner roles
appHandler.addRoute({url: 'owner/view/roles', page: OwnerRolesPage }, 'privateRoutes')
// owner limited transaction
appHandler.addRoute({url: 'owner/view/limitedTransactions', page: OwnerLimitedTransactionsPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/limitedTransactions/:limitedTransactionId', page: OwnerLimitedTransactionPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/limitedTransactions/:limitedTransactionId', page: OwnerLimitedTransactionEditPage }, 'privateRoutes')
// owner password
appHandler.addRoute({url: 'owner/view/passwords', page: OwnerPasswordsPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/create/passwords', page: OwnerPasswordCreatePage }, 'privateRoutes')
// owner client devices
appHandler.addRoute({url: 'owner/view/clientDevices', page: OwnerClientDevicesPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/create/clientDevices', page: OwnerClientDeviceCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/clientDevices/:clientDeviceId', page: OwnerClientDevicePage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/clientDevices/:clientDeviceId', page: OwnerClientDeviceEditPage }, 'privateRoutes')
// owner client device tokens
appHandler.addRoute({url: 'owner/view/clientDevices/:clientDeviceId/clientDeviceTokens', page: OwnerClientDeviceTokensPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/create/clientDevices/:clientDeviceId/clientDeviceTokens', page: OwnerClientDeviceTokenCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: OwnerClientDeviceTokenPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId', page: OwnerClientDeviceTokenEditPage }, 'privateRoutes')
// owner account refs
appHandler.addRoute({url: 'owner/view/accountRefs', page: OwnerAccountRefsPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/create/accountRefs', page: OwnerAccountRefCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/accountRefs/:accountRefId', page: OwnerAccountRefPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/accountRefs/:accountRefId', page: OwnerAccountRefEditPage }, 'privateRoutes')
// owner account refs account config
appHandler.addRoute({url: 'owner/view/accountRefs/:accountRefId/accountConfigs', page: OwnerAccountRefAccountConfigsPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/accountRefs/:accountRefId/accountConfigs/:accountConfigId', page: OwnerAccountRefAccountConfigPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/accountRefs/:accountRefId/accountConfigs/:accountConfigId', page: OwnerAccountRefAccountConfigEditPage }, 'privateRoutes')
// owner account refs roles
appHandler.addRoute({url: 'owner/view/accountRefs/:accountRefId/roles', page: OwnerAccountRefRolesPage }, 'privateRoutes')
// owner workspaces
appHandler.addRoute({url: 'owner/view/workspaces', page: OwnerWorkspacesPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/create/workspaces', page: OwnerWorkspaceCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/workspaces/:workspaceId', page: OwnerWorkspacePage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/workspaces/:workspaceId', page: OwnerWorkspaceEditPage }, 'privateRoutes')
// owner workspace accountRefs
appHandler.addRoute({url: 'owner/view/workspaces/:workspaceId/accountRefs', page: OwnerWorkspaceAccountRefsPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/create/workspaces/:workspaceId/accountRefs', page: OwnerWorkspaceAccountRefCreatePage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/workspaces/:workspaceId/accountRefs/:accountRefId', page: OwnerWorkspaceAccountRefPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/workspaces/:workspaceId/accountRefs/:accountRefId', page: OwnerWorkspaceAccountRefEditPage }, 'privateRoutes')
// owner workspace account config
appHandler.addRoute({url: 'owner/view/workspaces/:workspaceId/accountRefs/:accountRefId/accountConfigs', page: OwnerWorkspaceAccountRefAccountConfigsPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/workspaces/:workspaceId/accountRefs/:accountRefId/accountConfigs/:accountConfigId', page: OwnerWorkspaceAccountRefAccountConfigPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/edit/workspaces/:workspaceId/accountRefs/:accountRefId/accountConfigs/:accountConfigId', page: OwnerWorkspaceAccountRefAccountConfigEditPage }, 'privateRoutes')
// owner workspace account roles
appHandler.addRoute({url: 'owner/view/workspaces/:workspaceId/accountRefs/:accountRefId/roles', page: OwnerWorkspaceAccountRefRolesPage }, 'privateRoutes')

// notification
appHandler.addRoute({url: 'accounts/view/:accountId/notifications', page: AccountNotificationsPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/notifications', page: OwnerNotificationsPage }, 'privateRoutes')

// actions
appHandler.addRoute({url: 'accounts/view/:accountId/actions/:actionType/module/:moduleType/:moduleId/ref/:refType/:refId', page: AccountAccountActionPage }, 'privateRoutes')
appHandler.addRoute({url: 'accounts/view/:accountId/actions/:actionType/module/:moduleType/:moduleId/subModule/:subModuleType/:subModuleId/ref/:refType/:refId', page: AccountAccountWorkspaceActionPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/:accountId/actions/:actionType/module/:moduleType/:moduleId/ref/:refType/:refId', page: OwnerAccountActionPage }, 'privateRoutes')
appHandler.addRoute({url: 'owner/view/:accountId/actions/:actionType/module/:moduleType/:moduleId/subModule/:subModuleType/:subModuleId/ref/:refType/:refId', page: OwnerAccountWorkspaceActionPage }, 'privateRoutes')


// add items to main drawers
appHandler.addMainNav({
  label: 'Account Data',
  links:  [
      { label: 'Dashboard', url: '/', Icon: HomeIcon }
  ]
}, 'privateNavs')

appHandler.addMainNav({
  label: 'Global Data',
  links:  [
      { label: 'Features', url: '/features', Icon: FeaturedPlayListIcon },
      { label: 'Roles', url: '/roles', Icon: AdminPanelSettingsIcon },
      { label: 'Accounts', url: '/accounts', Icon: PeopleIcon },
      { label: 'System', url: '/system', Icon: ComputerIcon }
  ]
}, 'privateNavs')

// add items to account drawers
// for public
appHandler.addMainNav({
  label: 'Default Public Main Nav',
  links:  [
      { label: 'Dashboard', url: '/' }
  ]
}, 'publicNavs')

appHandler.addSideNav({
  label: 'Auth Pages',
  links: [
      { label: 'Signin', url: '/signin', Icon: LockOutlinedIcon },
      { label: 'Signin OTP', url: '/signinOTP', Icon: KeyIcon },
      { label: 'Signup', url: '/signup', Icon: AccountBoxOutlinedIcon },
      { label: 'Forgot Password', url: '/forgotPassword', Icon: KeyOffOutlinedIcon },
      { label: 'Reset Password', url: '/resetPassword', Icon: LockResetOutlinedIcon },
      { label: 'Signed Accounts', url: '/signedAccounts', Icon: GroupIcon }
  ]
}, 'publicNavs')

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
        await appUtils.loadActiveNotifications()
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
  useAppDispatch,
  useAppSelector,
  appStore,
  appHandler
}
export default App;
