import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicPageLayout from "../layouts/publicPageLayout";
import PublicHome from "../pages/home/publicHome";
import Signin from "../pages/auth/signin";
import Signup from "../pages/auth/signup";
import SigninOTP from "../pages/auth/signinOtp";
import ForgotPassword from "../pages/auth/forgotPassword";
import ResetPassword from "../pages/auth/resetPassword";
import PublicPageNotFound from "../components/infoOrWarnings/publicPageNotFound";

const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicPageLayout />}>
                    <Route index element={<PublicHome />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="signinOTP" element={<SigninOTP />} />
                    <Route path="forgotPassword" element={<ForgotPassword />} />
                    <Route path="resetPassword" element={<ResetPassword />} />
                    <Route path="*" element={<PublicPageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PublicRoutes