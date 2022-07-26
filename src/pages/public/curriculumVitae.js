import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const CurriculumVitae = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} md={3}
                        sx={{ textAlign: { xs: 'center', sm: 'right' } }}>
                        <Box
                            style={{ padding: 10 }}>
                            <img
                                style={{ width: '100%' }}
                                src='https://drive.google.com/uc?export=download&id=16F-YR8QbSHL6a_io95RfX1RyZUh9oyZB' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={7} md={9}
                        style={{ margin: 'auto' }}
                        sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <Box>
                            <Typography variant='h2'>
                                Gilbert D. Cuerbo
                            </Typography>
                            <Typography variant='h4' color='primary'>
                                Fullstack Javascript Developer
                            </Typography>
                            <Box>
                                <Typography variant='body1'>
                                    gilbert.cuerbo@gmail.com
                                </Typography>
                                <Typography variant='body1'>
                                    +639273854605
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Typography variant='body1'>
                    As a modern farmer, my goal is to be able to create technologies
                    for different platforms. To make life easier with positive impact
                    to the environment. To enhance communities and Environment by
                    developing technologies that will replace methods that are harmful or
                    destructive to humanity.
                </Typography>
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