import React from 'react';
import { Typography, Grid, Button, Container } from '@mui/material'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const PublicLandingPage = () => {
    return (
        <Container>
            <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '80vh' }}>
                <Grid item xs={12}>
                    <Typography color='primary' variant='h5'>Welcome to Kagiweb Tech!</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{textIndent: '50px',marginBottom: '15px'}}>
                        Kagiweb Tech is a flexible, open-source web application designed to be the foundation for building your own custom applications. Whether you're a seasoned developer or just getting started, Kagiweb Tech gives you the freedom and flexibility to create, modify, and expand with ease.
                    </Typography>
                    <Typography style={{marginBottom: '15px'}}>
                        As an open-source project under the MIT License, you are free to use, modify, and distribute the code as you see fit. Our goal is to empower the community by providing a solid base for innovation.
                    </Typography>
                    <Typography style={{marginBottom: '15px'}}>
                        Jump right in and start building your next great app with Kagiweb Tech completely free and fully customizable!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant='outlined'
                        onClick={() => window.location.replace('/signin')}
                        endIcon={<TrendingFlatIcon />}>go to signin page</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default PublicLandingPage