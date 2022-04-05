// import { useState } from 'react'
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

import AppSettings from './admin/appSettings'
import AppEndpoints from './admin/appEndpoints'
import AppRoles from './admin/appRoles'
import AppRoleEndpoints from './admin/appRoleEndpoints'
import AppUsers from './admin/appUsers'

// error page
import NotFound from './notFound'

import config from '../config'

const Pages = (props) => {
    // console.log(config)

    return (
        <BrowserRouter>
            <Routes>
                {/* initial redirect */}
                <Route path="/" element={<Navigate replace to={`/${ config.rootRoute }/auth/login`} />} />

                {/* auth pages */}
                <Route path={`${ config.rootRoute }/auth/`} element={<AuthLayout />}>
                    <Route path="" element={<Navigate replace to={`/${ config.rootRoute }/auth/login`} />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="resetPassword" element={<ResetPassword />} />
                    <Route path="resetPassword/:key" element={<ResetPassword />} />
                    <Route path="forgotPassword" element={<ForgotPassword />} />
                </Route>

                {/* main pages */}
                <Route path={`${ config.rootRoute }/`} element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to={`/${ config.rootRoute }/home`} />} />
                    <Route path="home" element={<Home />} />
                </Route>

                <Route path={`${ config.rootRoute }/account/`} element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to={`/${ config.rootRoute }/account/credentials`} />} />
                    <Route path="credentials" element={<AccountCredentials />} />
                    <Route path="profile" element={<AccountProfile />} />
                    <Route path="settings" element={<AccountSettings />} />
                </Route>

                <Route path={`${ config.rootRoute }/admin/`} element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to={`/${ config.rootRoute }/admin/appSettings`} />} />
                    <Route path="appSettings" element={<AppSettings />} />
                    <Route path="appEndpoints" element={<AppEndpoints />} />
                    <Route path="appRoles" element={<AppRoles />} />
                    <Route path="appRoleEndpoints" element={<AppRoleEndpoints />} />
                    <Route path="appUsers" element={<AppUsers />} />
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