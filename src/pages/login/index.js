import { useState, useContext } from 'react'
import AccountContext from '../../context/accountContext'

const Login = (props) => {
    const ctx = useContext(AccountContext)

    const btnClicked = (e) => {
        ctx.setAccountContext({testVal: 'login test value from context'})
    }

    return (
        <div>
            Login Page
            <button onClick={ btnClicked }>set value</button>
        </div>
    )
}

export default Login