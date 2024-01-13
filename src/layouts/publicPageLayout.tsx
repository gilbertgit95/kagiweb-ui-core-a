// import React from "react";
import * as React from 'react';
import PrimaryNav from '../components/navs/primaryNav';
import { Outlet } from "react-router-dom";

// type Props = {
//     children?: React.ReactNode
// }
const PublicPageLayout =() => {
    const links:{url:string,label:string}[] = [
        { label: 'Signin', url: '/signin' },
        { label: 'Signin OTP', url: '/signinOTP' },
        { label: 'Signup', url: '/signup' },
        { label: 'Forgot Password', url: '/forgotPassword' },
        { label: 'Reset Password', url: '/resetPassword' }
    ]

    return (
        <>
            <PrimaryNav links={links} />
            <Outlet />
        </>
    )
}

export default PublicPageLayout