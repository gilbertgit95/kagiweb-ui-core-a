import { useState, useContext } from 'react'
import { Outlet, Link } from "react-router-dom";
import Context from '../../context'

const AuthLayout = (props) => {
    const { authData } = useContext(Context)

    return (
        <div>
            <div>Authlayout Page</div>
            <div>Test Data { authData? authData: '' }</div>
            <div>
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/logout">Logout</Link>
                <Link to="/auth/resetPassword">Reset Password</Link>
            </div>
            <div style={{padding: 50, textAlign: 'center'}}>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout