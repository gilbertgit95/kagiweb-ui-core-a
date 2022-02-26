import { useState, useContext, useEffect } from 'react'

import { useNavigate } from "react-router-dom"

import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import LoginIcon from '@mui/icons-material/Login'
import Button from '@mui/material/Button'

import AccountContext from '../../common/context/accountContext'
import utils from '../../utilities'

const Login = (props) => {

    const [navRoute, setNavRoute] = useState(null)
    const navigate = useNavigate()
    // const ctx = useContext(AccountContext)

    // const btnClicked = (e) => {
    //     ctx.setAccountContext({testVal: 'login test value from context'})
    // }

    const login = async () => {
        await utils.waitFor(2)
        setNavRoute('/')
    }

    // life cycles
    useEffect(() => {
        // use to navigate
        if (navRoute) {
            navigate(navRoute)
        }
    }, [navRoute, navigate])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='text'
                    label='username / email' />
            </Grid>
            

            <Grid item xs={12}>
                <TextField
                    size='small'
                    fullWidth
                    variant='outlined'
                    color='primary'
                    type='password'
                    label='password' />
            </Grid>
            

            <Grid item xs={12}>
                <Button
                    size='small'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={login}
                    startIcon={<LoginIcon />}>
                    login
                </Button>
                <Box style={{marginTop: 15}}>
                    <Link
                        color="inherit"
                        href="/auth/forgotPassword">
                        Forgot password
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login