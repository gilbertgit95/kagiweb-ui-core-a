import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivatePageLayout from "../layouts/privatePageLayout";
import PrivatePageNotFound from "../components/infoOrWarnings/privatePageNotFound";

import PrivateHome from "../pages/home/privateHome";
import Features from "../pages/features/features";
import ViewFeature, { EditFeature, CreateFeature } from "../pages/features/feature"

import Roles from "../pages/roles/roles";
import Users from "../pages/users/users";
import Workspaces from "../pages/workspaces/workspaces";

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivatePageLayout />}>
                    <Route index element={<PrivateHome />} />

                    {/* feature pages */}
                    <Route path="features" element={<Features />} />
                    <Route path="features/create" element={<CreateFeature />} />
                    <Route path="features/view/:featureId" element={<ViewFeature />} />
                    <Route path="features/edit/:featureId" element={<EditFeature />} />

                    {/* role pages */}
                    <Route path="roles" element={<Roles />} />

                    {/* user pages */}
                    <Route path="users" element={<Users />} />

                    {/* workspace pages */}
                    <Route path="workspaces" element={<Workspaces />} />

                    <Route path="*" element={<PrivatePageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes