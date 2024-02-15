import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Typography, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RoleService from './roleService';
import RoleEditForm from './roleEditForm';

export  const RoleEditPage = () => {
    let { roleId } = useParams()
    const navigate = useNavigate()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h5' style={{padding:'10px'}}>
                        <VisibilityIcon /> Role Update View
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
                <RoleEditForm
                    roleId={roleId}
                    getFunc={RoleService.getRole}
                    updateFunc={RoleService.updateRole} />
            </Grid>
        </Container>
    )
}

export default RoleEditPage