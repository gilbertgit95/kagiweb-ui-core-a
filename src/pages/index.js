// import { useState } from 'react'
import {
    Navigate,
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

// layouts components
import PublicPageLayout from '../common/layouts/publicPageLayout'
import AuthLayout from '../common/layouts/authLayout'
import MainLayout from '../common/layouts/mainLayout'

// auth pages
import Login from './auth/login'
import Logout from './auth/logout'
import ResetPassword from './auth/resetPassword'
import ForgotPassword from './auth/forgotPassword'

// root pages
import Home from './home'

// acount pages
import AccountCredentials from './account/accountCredentials'
import AccountProfile from './account/accountProfile'
import AccountSettings from './account/accountSettings'

// admin pages
import AppSettings from './admin/appSettings'
import AppEndpoints from './admin/appEndpoints'
import AppRoles from './admin/appRoles'
import AppRoleEndpoints from './admin/appRoleEndpoints'
import AppUsers from './admin/appUsers'

// demo pages
import DemoIntroduction from './demo/introduction'
import DemoButtons from './demo/buttons'
import DemoInputs from './demo/inputs'
import DemoNavigations from './demo/navs'
import DemoBlocks from './demo/blocks'

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

                {/* Root pages */}
                <Route path={`${ config.rootRoute }/`} element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to={`/${ config.rootRoute }/home`} />} />
                    <Route path="home" element={<Home />} />
                </Route>

                {/* Account pages */}
                <Route path={`${ config.rootRoute }/account/`} element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to={`/${ config.rootRoute }/account/credentials`} />} />
                    <Route path="credentials" element={<AccountCredentials />} />
                    <Route path="profile" element={<AccountProfile />} />
                    <Route path="settings" element={<AccountSettings />} />
                </Route>

                {/* Admin pages */}
                <Route path={`${ config.rootRoute }/admin/`} element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to={`/${ config.rootRoute }/admin/appSettings`} />} />
                    <Route path="appSettings" element={<AppSettings />} />
                    <Route path="appEndpoints" element={<AppEndpoints />} />
                    <Route path="appRoles" element={<AppRoles />} />
                    <Route path="appRoleEndpoints" element={<AppRoleEndpoints />} />
                    <Route path="appUsers" element={<AppUsers />} />
                </Route>

                {/* Demo pages */}
                <Route path={`${ config.rootRoute }/demo/`} element={<MainLayout />}>
                    <Route path="" element={<Navigate replace to={`/${ config.rootRoute }/demo/introduction`} />} />
                    <Route path="introduction" element={<DemoIntroduction />} />
                    <Route path="buttons" element={<DemoButtons />} />
                    <Route path="inputs" element={<DemoInputs />} />
                    <Route path="navigations" element={<DemoNavigations />} />
                    <Route path="blocks" element={<DemoBlocks />} />
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