import { Typography, Grid } from "@mui/material"

const PublicPageNotFound = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <Typography color='primary' variant='h5'>This page does not exist!</Typography>
            </Grid>
        </Grid>
    )
}

export default PublicPageNotFound