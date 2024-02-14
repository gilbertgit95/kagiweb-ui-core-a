import React from 'react';
import { useNavigate, } from 'react-router-dom';
import { Container, Button, Typography, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FeatureCreateForm from './featureCreateForm';

export const FeatureCreatePage = () => {
    const navigate = useNavigate()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> Feature Creation View
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="text"
                        startIcon={<ArrowBackIosNewIcon />}
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
                <FeatureCreateForm />
            </Grid>
        </Container>
    )
}

export default FeatureCreatePage