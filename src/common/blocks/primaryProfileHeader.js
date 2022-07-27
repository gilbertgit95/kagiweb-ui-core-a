import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const PrimaryProfileHeader = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={3}
                sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                <Box
                    style={{ padding: 10 }}>
                    <img
                        style={{ width: '100%' }}
                        src={ props.profilePic } />
                </Box>
            </Grid>
            <Grid item xs={12} sm={7} md={9}
                style={{ margin: 'auto' }}
                sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Box>
                    <Typography variant='h2'>{ props.fullName }</Typography>
                    <Typography variant='h4' color='primary'>{ props.position }</Typography>
                    <Box>
                        {
                            props.contacts? props.contacts.map((con, conIndex) => {
                                return (
                                    <Typography
                                        key={'con' + conIndex}
                                        variant='body1'>{ con }</Typography>
                                )
                            }): null
                        }
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default PrimaryProfileHeader