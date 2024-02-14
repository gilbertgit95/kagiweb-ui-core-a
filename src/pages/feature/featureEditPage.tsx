import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Typography, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FeatureService from './featureService';

import FeatureEditForm from './featureEditForm';

export  const FeatureEditPage = () => {
    let { featureId } = useParams()
    const navigate = useNavigate()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid item xs={12}>
                <Typography variant='h5' style={{padding:'10px'}}>
                    <VisibilityIcon /> Feature Update View
                </Typography>
                <Divider />
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="text"
                        startIcon={<ArrowBackIosNewIcon />}
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
                <FeatureEditForm
                    featureId={featureId}
                    getFunc={FeatureService.getFeature}
                    updateFunc={FeatureService.updateFeature} />
            </Grid>
        </Container>
    )
}

export default FeatureEditPage