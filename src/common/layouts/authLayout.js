import { useState, useContext } from 'react'
import { Outlet, Link } from "react-router-dom"
import TextField from '../inputs/textField'
import SelectBox from '../inputs/selectBox'

import AccountContext from '../../context/accountContext'

const AuthLayout = (props) => {
    const ctx = useContext(AccountContext)

    let accountVal = ctx.accountContext && ctx.accountContext.testVal? ctx.accountContext.testVal: ''

    return (
        <div>
            <div>{ accountVal }</div>
            <TextField
                onChange={(e) => {
                    console.log(e.target.value)
                }}
                type='textarea'
                legend='test legend'
                value='test val'
                postfix={<span>post</span>}
                prefix={<span>pre</span>} />

            <SelectBox
                onChange={(e) => {
                    console.log(e.target.value)
                }}
                legend='test select'
                value='Terminated'
                postfix={<span>post</span>}
                prefix={<span>pre</span>} >
                <option aria-label="None" value="" />
                <option value="Terminated">Terminated</option>
                <option value="Successful">Qualified Interview</option>
                <option value="Unsuccessful">No Interview</option>
                <option value="No Answer">No Answer</option>
            </SelectBox>
            <div>Authlayout Page</div>
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