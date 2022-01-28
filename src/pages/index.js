import { useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

import AuthLayout from '../common/layouts/authLayout'
import Login from './login'
import Logout from './logout'
import ResetPassword from './resetPassword'
import ForgotPassword from './forgotPassword'

const Pages = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route path="auth/login" element={<Login />} />
                    <Route path="auth/logout" element={<Logout />} />
                    <Route path="auth/resetPassword" element={<ResetPassword />} />
                    <Route path="auth/resetPassword/:key" element={<ResetPassword />} />
                    <Route path="auth/forgotPassword" element={<ForgotPassword />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Pages