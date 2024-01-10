// import React from "react";
import { Outlet } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { clearUserData } from '../stores/signedInUserSlice';

import Config from "../utils/config";
import AuthService from "../pages/auth/authService";

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
        <div>
            <h2>Private Page Layout</h2>
            <div>
                <b>{ userData? userData.username: '' }</b>
                <Button onClick={signOut}>
                    signout
                </Button>

                <DeleteIcon color='primary' />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default PrivatePageLayout