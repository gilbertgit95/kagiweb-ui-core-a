import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivatePageLayout from '../layouts/privatePageLayout';
import PrivatePageNotFound from '../components/infoOrWarnings/privatePageNotFound';

import PrivateHomePage from '../pages/home/privateHomePage';

import FeaturesPage from '../pages/feature/featuresPage';
import FeaturePage from '../pages/feature/featurePage';
import FeatureCreatePage from '../pages/feature/featureCreatePage';
import FeatureEditPage from '../pages/feature/featureEditPage';

import RolesPage from '../pages/roles/rolesPage';
import RolePage from '../pages/roles/rolePage';
import RoleCreatePage from '../pages/roles/roleCreatePage';
import RoleEditPage from '../pages/roles/roleEditPage';

import UsersPage from '../pages/user/usersPage';
import UserCreatePage from '../pages/user/userCreatePage';
import UserPage from '../pages/user/userPage';
import UserEditPage from '../pages/user/userEditPage';

import Workspaces from '../pages/userWorkspace/userWorkspaces';

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

                    {/* user pages */}
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/create" element={<UserCreatePage />} />
                    <Route path="users/view/:userId" element={<UserPage />} />
                    <Route path="users/edit/:userId" element={<UserEditPage />} />
                    {/* user workspace pages */}
                    <Route path="users/view/:userId/workspaces" element={<Workspaces />} />

                    {/* owner pages */}
                    <Route path="owner" element={<OwnerPage />} />
                    <Route path="owner/edit" element={<OwnerEditPage />} />

                    <Route path="*" element={<PrivatePageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes