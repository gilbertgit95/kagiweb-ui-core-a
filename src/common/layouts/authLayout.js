import { useState, useContext } from 'react'
import { Outlet, Link } from "react-router-dom"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AccountContext from '../context/accountContext'
import ThemeToggle from '../themes/themeToggle'
import config from '../../config'

const AuthLayout = (props) => {
    // const ctx = useContext(AccountContext)

    // let accountVal = ctx.accountContext && ctx.accountContext.testVal? ctx.accountContext.testVal: ''

    return (
        <Container maxWidth="sm">
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <img
                            style={{width: 150}}
                            src='/favicon.png' />
                        <Typography variant="h4" gutterBottom component="div">
                            { config.appName }
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Box
                            style={{
                                width: 300,
                                margin: 'auto',
                                padding: 20,
                                paddingTop: 40,
                                paddingBottom: 40,
                                boxShadow: '2px 2px 3px 2px rgb(0 0 0 / 20%)'
                            }}>
                            <ThemeToggle />
                            <Outlet />
                        </Box>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography variant="caption" display="block" gutterBottom>
                            Copyrights 2021
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default AuthLayout