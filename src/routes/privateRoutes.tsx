import { Grid, Button } from '@mui/material'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivatePageLayout from '../layouts/privatePageLayout';
import NotFoundPage from '../components/infoOrWarnings/pageNotFound';

import PrivateHomePage from '../pages/home/privateHomePage';

import FeaturesPage from '../pages/feature/featuresPage';
import FeaturePage from '../pages/feature/featurePage';
import FeatureCreatePage from '../pages/feature/featureCreatePage';
import FeatureEditPage from '../pages/feature/featureEditPage';

import RolesPage from '../pages/role/rolesPage';
import RolePage from '../pages/role/rolePage';
import RoleCreatePage from '../pages/role/roleCreatePage';
import RoleEditPage from '../pages/role/roleEditPage';

import RoleFeaturesPage from '../pages/roleFeature/roleFeaturesPage';
import RoleFeaturesEditPage from '../pages/roleFeature/roleFeaturesEditPage';

import UsersPage from '../pages/user/usersPage';
import UserCreatePage from '../pages/user/userCreatePage';
import UserPage from '../pages/user/userPage';
import UserEditPage from '../pages/user/userEditPage';

import UserRolesPage from '../pages/userRole/userRolesPage';
import UserRolesEditPage from '../pages/userRole/userRolesEditPage';

import UserPasswordsPage from '../pages/userPassword/userPasswordsPage';
import UserPasswordCreatePage from '../pages/userPassword/userPasswordCreatePage';

import UserLimitedTransactionsPage from '../pages/userLimitedTransaction/userLimitedTransactionsPage';
import UserLimitedTransactionPage from '../pages/userLimitedTransaction/userLimitedTransactionPage';
import UserLimitedTransactionEditPage from '../pages/userLimitedTransaction/userLimitedTransactionEditPage';

import UserClientDevicesPage from '../pages/userClientDevice/userClientDevicesPage';
import UserClientDevicePage from '../pages/userClientDevice/userClientDevicePage';
import UserClientDeviceCreatePage from '../pages/userClientDevice/userClientDeviceCreatePage';
import UserClientDeviceEditPage from '../pages/userClientDevice/userClientDeviceEditPage';

import UserClientDeviceTokensPage from '../pages/userClientDeviceToken/userClientDeviceTokensPage';
import UserClientDeviceTokenPage from '../pages/userClientDeviceToken/userClientDeviceTokenPage';
import UserClientDeviceTokenCreatePage from '../pages/userClientDeviceToken/userClientDeviceTokenCreatePage';
import UserClientDeviceTokenEditPage from '../pages/userClientDeviceToken/userClientDeviceTokenEditPage';

import UserContactInfosPage from '../pages/userContactInfo/userContactInfosPage';
import UserContactInfoPage from '../pages/userContactInfo/userContactInfoPage';
import UserContactInfoEditPage from '../pages/userContactInfo/userContactInfoEditPage';
import UserContactInfoCreatePage from '../pages/userContactInfo/userContactInfoCreatePage';

import UserUserInfosPage from '../pages/userUserInfo/userUserInfosPage';
import UserUserInfoPage from '../pages/userUserInfo/userUserInfoPage';
import UserUserInfoEditPage from '../pages/userUserInfo/userUserInfoEditPage';
import UserUserInfoCreatePage from '../pages/userUserInfo/userUserInfoCreatePage';

import UserWorkspacesPage from '../pages/userWorkspace/userWorkspacesPage';

import OwnerPage from '../pages/owner/ownerPage';
import OwnerEditPage from '../pages/owner/ownerEditPage';
import OwnerUserInfosPage from '../pages/owner/ownerUserInfosPage';
import OwnerUserInfoCreatePage from '../pages/owner/ownerUserInfoCreatePage';
import OwnerUserInfoEditPage from '../pages/owner/ownerUserInfoEditPage';
import OwnerUserInfoPage from '../pages/owner/ownerUserInfoPage';
import OwnerContactInfosPage from '../pages/owner/ownerContactInfosPage';
import OwnerContactInfoCreatePage from '../pages/owner/ownerContactInfoCreatePage';
import OwnerContactInfoPage from '../pages/owner/ownerContactInfoPage';
import OwnerContactInfoEditPage from '../pages/owner/ownerContactInfoEditPage';
import OwnerRolesPage from '../pages/owner/ownerRolesPage';

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivatePageLayout />}>
                    <Route index element={<PrivateHomePage />} />

                    {/* feature pages */}
                    <Route path="features" element={<FeaturesPage />} />
                    <Route path="features/create" element={<FeatureCreatePage />} />
                    <Route path="features/view/:featureId" element={<FeaturePage />} />
                    <Route path="features/edit/:featureId" element={<FeatureEditPage />} />

                    {/* role pages */}
                    <Route path="roles" element={<RolesPage />} />
                    <Route path="roles/create" element={<RoleCreatePage />} />
                    <Route path="roles/view/:roleId" element={<RolePage />} />
                    <Route path="roles/edit/:roleId" element={<RoleEditPage />} />
                    {/* role feature pages */}
                    <Route path="roles/view/:roleId/features" element={<RoleFeaturesPage />} />
                    <Route path="roles/edit/:roleId/features" element={<RoleFeaturesEditPage />} />

                    {/* user pages */}
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/create" element={<UserCreatePage />} />
                    <Route path="users/view/:userId" element={<UserPage />} />
                    <Route path="users/edit/:userId" element={<UserEditPage />} />
                    {/* user roles */}
                    <Route path="users/view/:userId/roles" element={<UserRolesPage />} />
                    <Route path="users/edit/:userId/roles" element={<UserRolesEditPage />} />
                    {/* user passwords */}
                    <Route path="users/view/:userId/passwords" element={<UserPasswordsPage />} />
                    <Route path="users/create/:userId/passwords" element={<UserPasswordCreatePage />} />
                    {/* user limited transactions */}
                    <Route path="users/view/:userId/limitedTransactions" element={<UserLimitedTransactionsPage />} />
                    <Route path="users/view/:userId/limitedTransactions/:limitedTransactionId" element={<UserLimitedTransactionPage />} />
                    <Route path="users/edit/:userId/limitedTransactions/:limitedTransactionId" element={<UserLimitedTransactionEditPage />} />
                    {/* user client devices */}
                    <Route path="users/view/:userId/clientDevices" element={<UserClientDevicesPage />} />
                    <Route path="users/create/:userId/clientDevices" element={<UserClientDeviceCreatePage />} />
                    <Route path="users/view/:userId/clientDevices/:clientDeviceId" element={<UserClientDevicePage />} />
                    <Route path="users/edit/:userId/clientDevices/:clientDeviceId" element={<UserClientDeviceEditPage />} />
                    {/* user client device tokens */}
                    <Route path="users/view/:userId/clientDevices/:clientDeviceId/clientDeviceTokens" element={<UserClientDeviceTokensPage />} />
                    <Route path="users/create/:userId/clientDevices/:clientDeviceId/clientDeviceTokens/" element={<UserClientDeviceTokenCreatePage />} />
                    <Route path="users/view/:userId/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId" element={<UserClientDeviceTokenPage />} />
                    <Route path="users/edit/:userId/clientDevices/:clientDeviceId/clientDeviceTokens/:clientDeviceTokenId" element={<UserClientDeviceTokenEditPage />} />
                    
                    {/* user contact infos */}
                    <Route path="users/view/:userId/contactInfos" element={<UserContactInfosPage />} />
                    <Route path="users/view/:userId/contactInfos/:contactInfoId" element={<UserContactInfoPage />} />
                    <Route path="users/edit/:userId/contactInfos/:contactInfoId" element={<UserContactInfoEditPage />} />
                    <Route path="users/create/:userId/contactInfos" element={<UserContactInfoCreatePage />} />
                    {/* user user infos */}
                    <Route path="users/view/:userId/userInfos" element={<UserUserInfosPage />} />
                    <Route path="users/view/:userId/userInfos/:userInfoId" element={<UserUserInfoPage />} />
                    <Route path="users/edit/:userId/userInfos/:userInfoId" element={<UserUserInfoEditPage />} />
                    <Route path="users/create/:userId/userInfos" element={<UserUserInfoCreatePage />} />
                    {/* user workspace pages */}
                    <Route path="users/view/:userId/workspaces" element={<UserWorkspacesPage />} />

                    {/* owner pages */}
                    <Route path="owner/view" element={<OwnerPage />} />
                    <Route path="owner/edit" element={<OwnerEditPage />} />
                    {/* owner user info */}
                    <Route path="owner/view/userInfos" element={<OwnerUserInfosPage />} />
                    <Route path="owner/create/userInfos" element={<OwnerUserInfoCreatePage />} />
                    <Route path="owner/view/userInfos/:userInfoId" element={<OwnerUserInfoPage />} />
                    <Route path="owner/edit/userInfos/:userInfoId" element={<OwnerUserInfoEditPage />} />
                    {/* owner contact info */}
                    <Route path="owner/view/contactInfos" element={<OwnerContactInfosPage />} />
                    <Route path="owner/create/contactInfos" element={<OwnerContactInfoCreatePage />} />
                    <Route path="owner/view/contactInfos/:contactInfoId" element={<OwnerContactInfoPage />} />
                    <Route path="owner/edit/contactInfos/:contactInfoId" element={<OwnerContactInfoEditPage />} />
                    {/* owner roles */}
                    <Route path="owner/view/roles" element={<OwnerRolesPage />} />

                    {/* for none existing page */}
                    <Route
                        path="*"
                        element={
                            <NotFoundPage>
                                <Grid item xs={12}>
                                    <Button
                                        variant='outlined'
                                        onClick={() => window.location.replace('/')}
                                        endIcon={<TrendingFlatIcon />}>go to home page</Button>
                                </Grid>
                            </NotFoundPage>
                        } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes