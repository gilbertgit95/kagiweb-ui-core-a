import { useContext } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import LinearProgress from '@mui/material/LinearProgress'

import AccountContext from '../../common/contexts/accountContext'
import config from '../../config'

const NotFound = (props) => {
    const AccCtx = useContext(AccountContext)
    console.log('notFound: ', AccCtx.accountContext)
    let userDataIsLoading = Boolean(AccCtx.accountContext.__isLoading)

    return (
        <Grid container spacing={2}>
            {
                userDataIsLoading? (
                    <>
                        <Grid item xs={12}
                            style={{
                                textAlign: 'center',
                                marginTop: '10%'
                            }}>
                            <img
                                alt="logo"
                                style={{width: 150}}
                                src='/favicon.png' />
                            <Typography variant="h4">
                                { config.appName }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                style={{
                                    margin: 'auto',
                                    padding: 20,
                                    width: '50%'
                                }}>
                                <LinearProgress />
                                <Typography
                                    color='primary'
                                    variant='subtitle1'
                                    style={{
                                        marginTop: 15
                                    }}>
                                    Loading initial user data
                                </Typography>
                            </Box>
                        </Grid>
                    </>
                ): (
                    <>
                        <Grid item xs={12}>
                            <Typography
                                style={{marginTop: '5%'}}
                                color='primary'
                                variant='h4'>
                                Error 404 not found Content.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                color='primary'
                                variant='subtitle1'>
                                This page does not exist, or you are currently logged out.
                                Try signing in to access the page.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Link
                                color="primary"
                                href={`/${ config.rootRoute }/auth/login`}>
                                click here to signin
                            </Link>
                        </Grid>
                    </>
                )
            }
        </Grid>
    )
}

export default NotFound