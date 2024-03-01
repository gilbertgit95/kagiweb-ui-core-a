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
import UserPasswordsPage from '../pages/userPassword/userPasswordsPage';
import UserLimitedTransactionsPage from '../pages/userLimitedTransaction/userLimitedTransactionsPage';
import UserClientDevicesPage from '../pages/userClientDevice/userClientDevicesPage';
import UserClientDevicePage from '../pages/userClientDevice/userClientDevicePage';
import UserClientDeviceTokensPage from '../pages/userClientDeviceToken/userClientDeviceTokensPage';
import UserContactInfosPage from '../pages/userContactInfo/userContactInfosPage';
import UserUserInfosPage from '../pages/userUserInfo/userUserInfosPage';

import UserWorkspacesPage from '../pages/userWorkspace/userWorkspacesPage';

import OwnerPage from '../pages/owner/ownerPage';
import OwnerEditPage from '../pages/owner/ownerEditPage';

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
                    {/* user passwords */}
                    <Route path="users/view/:userId/passwords" element={<UserPasswordsPage />} />
                    {/* user limited transactions */}
                    <Route path="users/view/:userId/limitedTransactions" element={<UserLimitedTransactionsPage />} />
                    {/* user client devices */}
                    <Route path="users/view/:userId/clientDevices" element={<UserClientDevicesPage />} />
                    <Route path="users/view/:userId/clientDevices/:clientDeviceId" element={<UserClientDevicePage />} />
                    {/* user client device tokens */}
                    <Route path="users/view/:userId/clientDevices/:clientDeviceId/clientDeviceTokens" element={<UserClientDeviceTokensPage />} />
                    {/* user contact infos */}
                    <Route path="users/view/:userId/contactInfos" element={<UserContactInfosPage />} />
                    {/* user user infos */}
                    <Route path="users/view/:userId/userInfos" element={<UserUserInfosPage />} />
                    {/* user workspace pages */}
                    <Route path="users/view/:userId/workspaces" element={<UserWorkspacesPage />} />

                    {/* owner pages */}
                    <Route path="owner" element={<OwnerPage />} />
                    <Route path="owner/edit" element={<OwnerEditPage />} />

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