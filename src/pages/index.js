import { useState } from 'react'
import {
    Navigate,
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
import AccountCredentials from './account/accountCredentials'
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
                {/* initial redirect */}
                <Route path="/" element={<Navigate replace to="/core/auth/login" />} />

                {/* auth pages */}
                <Route path="core/auth/" element={<AuthLayout />}>
                    <Route path="" element={<Navigate replace to="/core/auth/login" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="resetPassword" element={<ResetPassword />} />
                    <Route path="resetPassword/:key" element={<ResetPassword />} />
                    <Route path="forgotPassword" element={<ForgotPassword />} />
                </Route>

                {/* main pages */}
                <Route path="core/" element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to="/core/home" />} />
                    <Route path="home" element={<Home />} />
                </Route>

                <Route path="core/account/" element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to="/core/account/credentials" />} />
                    <Route path="credentials" element={<AccountCredentials />} />
                    <Route path="profile" element={<AccountProfile />} />
                    <Route path="settings" element={<AccountSettings />} />
                </Route>

                {/* <Route path="core/administrator/" element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to="/core/administrator/appSettings" />} />
                    <Route path="appSettings" element={<Account />} />
                    <Route path="appEndpoints" element={<Account />} />
                    <Route path="appRoles" element={<Account />} />
                    <Route path="appRoleEndpoints" element={<Account />} />
                    <Route path="appUsers" element={<Account />} />
                </Route> */}

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