// import React from "react";
import { Outlet } from "react-router-dom";

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
                <button onClick={() => {dispatch(clearUserData())}}>
                    signout
                </button>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default PrivatePageLayout