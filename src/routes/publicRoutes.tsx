import { Grid, Button } from '@mui/material'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicPageLayout from '../layouts/publicPageLayout';
import PageNotFoundPage from '../components/infoOrWarnings/pageNotFound';

import PublicHomePage from '../pages/home/publicHomePage';
import SigninPage from '../pages/auth/signinPage';
import SignupPage from '../pages/auth/signupPage';
import SigninOTPPage from '../pages/auth/signinOtpPage';
import ForgotPasswordPage from '../pages/auth/forgotPasswordPage';
import ResetPasswordPage from '../pages/auth/resetPasswordPage';

const PublicRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicPageLayout />}>
                    <Route index element={<PublicHomePage />} />
                    <Route path="signin" element={<SigninPage />} />
                    <Route path="signup" element={<SignupPage />} />
                    <Route path="signinOTP" element={<SigninOTPPage />} />
                    <Route path="forgotPassword" element={<ForgotPasswordPage />} />
                    <Route path="resetPassword" element={<ResetPasswordPage />} />
                    <Route
                        path="*"
                        element={
                            <PageNotFoundPage>
                                <Grid item xs={12}>
                                    <Button
                                        variant='outlined'
                                        onClick={() => window.location.replace('/signin')}
                                        endIcon={<TrendingFlatIcon />}>go to signin page</Button>
                                </Grid>
                            </PageNotFoundPage>
                        } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PublicRoutes