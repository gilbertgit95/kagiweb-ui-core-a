// import {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
// import CircularProgress from '@mui/material/CircularProgress'

import InitialLoadinglayout from '../../common/layouts/initalLoadingLayout'
import config from '../../config'
// import utils from '../../common/utilities'

const NotFound = (props) => {
    let initialCount = 5
    // let [countdown, setCountdown] = useState(initialCount)

    // useEffect(() => {
        
    //     const init = async () => {
    //         for (let i = 0; i <= initialCount; i++) {
    //             setCountdown(countdown - i)
    //             await utils.waitFor(1)

    //             if ((countdown - i) <= 0) {
    //                 window.location.replace(`/${ config.rootRoute }/auth/`)
    //                 break
    //             }
    //         }
    //     }

    //     init()

    // }, [initialCount])

    return (
        <InitialLoadinglayout>
            <Grid container spacing={2}>
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
                {/* <Grid item xs={12}>
                    <CircularProgress style={{width: 15, height: 15}} component='span' />
                    <Typography
                        style={{marginLeft: 10}}
                        color='primary'
                        component='span'
                        variant='subtitle1'>
                        Redirecting to signin page in { countdown }...
                    </Typography>
                </Grid> */}
                <Grid item xs={12}>
                    <Link
                        color="primary"
                        href={`/${ config.rootRoute }/auth/login`}>
                        click here to signin
                    </Link>
                </Grid>
            </Grid>
        </InitialLoadinglayout>
    )
}

export default NotFound