import { Outlet } from "react-router-dom"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const PublicPagelayout = (props) => {

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
                            { props.children? props.children: <Outlet /> }
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

export default PublicPagelayout