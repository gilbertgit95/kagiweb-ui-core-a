import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "../components/layouts/pageLayout";
import PublicLandingPage from "./public/publicLandingPage";
import Signin from "./public/signin";
import SigninOTP from "./public/signinOtp";
import ForgotPassword from "./public/forgotPassword";
import ResetPassword from "./public/resetPassword";
import PublicNoPage from "./public/publicNoPage";

const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<PublicLandingPage />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signinOTP" element={<SigninOTP />} />
                    <Route path="forgotPassword" element={<ForgotPassword />} />
                    <Route path="resetPassword" element={<ResetPassword />} />
                    <Route path="*" element={<PublicNoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PublicRoutes