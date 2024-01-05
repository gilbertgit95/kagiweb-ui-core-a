// import React from "react";
import { Outlet } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

import { useAppDispatch, useAppSelector} from '../stores/appStore';
import { clearUserData } from '../stores/signedInUserSlice';

// type Props = {
//     children?: React.ReactNode
// }
const PrivatePageLayout =() => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.signedInUser.userData)

    return (
        <div>
            <h2>Private Page Layout</h2>
            <div>
                <b>{ userData? userData.username: '' }</b>
                <Button onClick={() => {dispatch(clearUserData())}}>
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