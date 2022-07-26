import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const CurriculumVitae = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} md={4}
                        sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                        <Box>
                            <img
                                width='200'
                                src='https://drive.google.com/uc?export=download&id=16F-YR8QbSHL6a_io95RfX1RyZUh9oyZB' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={7} md={8}
                        sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <Box>
                            <Typography variant='h2'>
                                Gilbert D. Cuerbo
                            </Typography>
                            <Typography variant='h5' color='primary'>
                                Fullstack Javascript Developer
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                overview
            </Grid>

            <Grid item xs={12}>
                experience
            </Grid>

            <Grid item xs={12}>
                personal projects
            </Grid>

            <Grid item xs={12}>
                education
            </Grid>

            <Grid item xs={12}>
                skills
            </Grid>
        </Grid>
    )
}

export default CurriculumVitae