import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import InitialLoadinglayout from '../../common/layouts/initalLoadingLayout'
import config from '../../config'

const NotFound = (props) => {

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