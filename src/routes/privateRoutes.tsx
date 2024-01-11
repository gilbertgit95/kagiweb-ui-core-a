import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivatePageLayout from "../layouts/privatePageLayout";
import PrivateHome from "../pages/home/privateHome";
import PrivatePageNotFound from "../components/infoOrWarnings/privatePageNotFound";

const PrivateRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivatePageLayout />}>
                    <Route index element={<PrivateHome />} />
                    {/* <Route path="signin" element={<Signin />} /> */}
                    <Route path="*" element={<PrivatePageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PrivateRoutes