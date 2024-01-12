import React from "react";
import { Outlet } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { clearUserData } from '../stores/signedInUserSlice';

import Config from "../utils/config";
import AuthService from "../pages/auth/authService";
import SecondaryNav from "../components/navs/secondaryNav";

// type Props = {
//     children?: React.ReactNode
// }
const PrivatePageLayout =() => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.signedInUser.userData)

    const signOut = async () => {
        try {
            await AuthService.signout()
        } catch (err) {
            console.log('Token has not been remove successfully from the database end, but will be cleared from the browser storage.')
        }
        dispatch(clearUserData())
        localStorage.removeItem(Config.TokenKey)
    }

    return (
        <>
            <SecondaryNav />
            <Typography variant="subtitle1">{ userData?.username }</Typography>
            <Button onClick={signOut}>
                signout
            </Button>
            <Outlet />
        </>
    )
}

export default PrivatePageLayout