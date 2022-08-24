import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import LoadingImg from '../atomicComponents/loadingImg'

const PrimaryProfileHeader = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={5} md={3}
                sx={{ padding: '10px', textAlign: { xs: 'center', sm: 'right' } }}>
                { props.image? (
                    <LoadingImg
                        style={{ width: '100%' }}
                        src={ props.image } />
                ): null }
            </Grid>
            <Grid item xs={12} sm={7} md={9}
                style={{ margin: 'auto' }}
                sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Box>
                    <Typography variant='h2'>{ props.header }</Typography>
                    <Typography variant='h4' color='primary'>{ props.subHeader }</Typography>
                    <Box>
                        {
                            props.subSubHeaders? props.subSubHeaders.map((con, conIndex) => {
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