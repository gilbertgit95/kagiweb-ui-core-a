import { CircularProgress, Typography, Grid } from "@mui/material"

type Props = {
    type: 'info'|'error'|'warning',
    messages: string[]
}

const ResponseStatus = (props:Props) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <CircularProgress />
            </Grid>
            <Grid item xs={12}>
                <Typography color='primary' variant='subtitle1'>Errors</Typography>
            </Grid>
        </Grid>
    )
}

export default ResponseStatus