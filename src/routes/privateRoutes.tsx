import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivatePageLayout from '../layouts/privatePageLayout';
import PrivatePageNotFound from '../components/infoOrWarnings/privatePageNotFound';

import OwnerPage from '../pages/owner/ownerPage';
import OwnerEditPage from '../pages/owner/ownerEditPage';

import PrivateHome from '../pages/home/privateHome';

import FeaturesPage from '../pages/feature/featuresPage';
import FeaturePage from '../pages/feature/featurePage';
import FeatureCreatePage from '../pages/feature/featureCreatePage';
import { EditFeature } from '../pages/feature/feature';

import Roles from '../pages/roles/roles';
import ViewRole, { EditRole, CreateRole } from '../pages/roles/role';

import UsersPage from '../pages/user/usersPage';
import UserCreatePage from '../pages/user/userCreatePage';
import UserPage from '../pages/user/userPage';
import UserEditPage from '../pages/user/userEditPage';

import Workspaces from '../pages/userWorkspace/userWorkspaces';

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivatePageLayout />}>
                    <Route index element={<PrivateHome />} />

                    {/* owner pages */}
                    <Route path="owner" element={<OwnerPage />} />
                    <Route path="owner/edit" element={<OwnerEditPage />} />

                    {/* feature pages */}
                    <Route path="features" element={<FeaturesPage />} />
                    <Route path="features/create" element={<FeatureCreatePage />} />
                    <Route path="features/view/:featureId" element={<FeaturePage />} />
                    <Route path="features/edit/:featureId" element={<EditFeature />} />

                    {/* role pages */}
                    <Route path="roles" element={<Roles />} />
                    <Route path="roles/create" element={<CreateRole />} />
                    <Route path="roles/view/:roleId" element={<ViewRole />} />
                    <Route path="roles/edit/:roleId" element={<EditRole />} />

                    {/* user pages */}
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/create" element={<UserCreatePage />} />
                    <Route path="users/view/:userId" element={<UserPage />} />
                    <Route path="users/edit/:userId" element={<UserEditPage />} />
                    {/* user workspace pages */}
                    <Route path="users/view/:userId/workspaces" element={<Workspaces />} />

                    <Route path="*" element={<PrivatePageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes