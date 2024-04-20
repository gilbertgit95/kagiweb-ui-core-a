// import React from "react";
import React, {FC} from 'react';
import PrimaryNav, { TLink } from '../components/navs/primaryNav';
import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import PagesIcon from '@mui/icons-material/Pages';
import HomeIcon from '@mui/icons-material/Home';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import KeyIcon from '@mui/icons-material/Key';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

import Config from '../config';

const NavCustomEl = () => {
    return (
        <>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                { Config.AppName }
            </Typography>
        </>
    )
}


const PublicPageLayout = () => {
    const links:TLink[] = [
        { label: 'Home', url: '/', Icon: HomeIcon },
        { label: 'Signin', url: '/signin', Icon: LockOutlinedIcon },
        { label: 'Signin OTP', url: '/signinOTP', Icon: KeyIcon },
        { label: 'Signup', url: '/signup', Icon: AccountBoxOutlinedIcon },
        { label: 'Forgot Password', url: '/forgotPassword', Icon: KeyOffOutlinedIcon },
        { label: 'Reset Password', url: '/resetPassword', Icon: LockResetOutlinedIcon }
    ]

    return (
        <>
            <PrimaryNav
                MenuIcon={PagesIcon}
                links={links}
                CustomEl={NavCustomEl} />
            <Outlet />
        </>
    )
}

export default PublicPageLayout