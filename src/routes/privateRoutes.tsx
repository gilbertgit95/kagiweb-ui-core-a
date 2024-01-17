import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivatePageLayout from "../layouts/privatePageLayout";
import PrivatePageNotFound from "../components/infoOrWarnings/privatePageNotFound";

import PrivateHome from "../pages/home/privateHome";
import Users from "../pages/users/users";

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivatePageLayout />}>
                    <Route index element={<PrivateHome />} />

                    {/* user pages */}
                    <Route path="users" element={<Users />} />

                    <Route path="*" element={<PrivatePageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes