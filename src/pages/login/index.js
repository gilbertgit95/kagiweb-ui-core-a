import { useState, useContext } from 'react'
import Context from '../../context'

const Login = (props) => {
    const { authContext, accountContext } = useContext(Context)

    const btnClicked = (e) => {
        authContext.setAuthValue(authContext.authValue? 0: authContext.authValue + 1)
    }

    return (
        <div>
            Login Page
            <button onClick={ btnClicked }>Increment value</button>
        </div>
    )
}

export default Login