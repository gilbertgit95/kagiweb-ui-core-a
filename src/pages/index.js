import { useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

// layouts
import PublicPageLayout from '../common/layouts/publicPageLayout'
import AuthLayout from '../common/layouts/authLayout'
import MainLayout from '../common/layouts/mainLayout'

// auth pages
import Login from './auth/login'
import Logout from './auth/logout'
import ResetPassword from './auth/resetPassword'
import ForgotPassword from './auth/forgotPassword'

// main pages
import Home from './home'
import Account from './account'
import AccountProfile from './account/accountProfile'
import AccountSettings from './account/accountSettings'

// error page
import NotFound from './notFound'

import config from '../config'

const Pages = (props) => {
    // console.log(config)

    return (
        <BrowserRouter>
            <Routes>
                {/* auth pages */}
                <Route path="/auth/" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="resetPassword" element={<ResetPassword />} />
                    <Route path="resetPassword/:key" element={<ResetPassword />} />
                    <Route path="forgotPassword" element={<ForgotPassword />} />
                </Route>

                {/* main pages */}
                <Route path="/" element={<MainLayout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="account" element={<Account />} />
                    <Route path="account/profile" element={<AccountProfile />} />
                    <Route path="account/settings" element={<AccountSettings />} />
                </Route>

                {/* error page */}
                <Route
                    path='*'
                    element={
                        <PublicPageLayout>
                            <NotFound />
                        </PublicPageLayout>
                    }></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Pages