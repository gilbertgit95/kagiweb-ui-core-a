import { useState, useContext } from 'react'
import { Outlet, Link } from "react-router-dom"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import AccountContext from '../context/accountContext'
import config from '../../config'

const MainLayout = (props) => {
    // const ctx = useContext(AccountContext)

    // let accountVal = ctx.accountContext && ctx.accountContext.testVal? ctx.accountContext.testVal: ''

    return (
        <Container maxWidth="lg">
            <Box>
                <Grid container spacing={2}>
                    {/* <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography variant="h4" gutterBottom component="div">
                            { config.appName }
                        </Typography>
                    </Grid> */}
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Box>
                            <Outlet />
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography variant="caption" display="block" gutterBottom>
                            Copyrights 2021
                        </Typography>
                    </Grid> */}
                </Grid>
            </Box>
        </Container>
    )
}

export default MainLayout