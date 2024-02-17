import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PrimaryHeader from '../../components/headers/primaryHeader';
import UserEditForm from './userEditForm';
import UserService from './userService';
import {
  useParams
} from 'react-router-dom';

export const UserEditPage = () => {
    let { userId } = useParams()
    const navigate = useNavigate()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'User Update View'} />
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
                <UserEditForm
                    getFunc={UserService.getUser}
                    updateFunc={UserService.updateUser}
                    userId={ userId } />
            </Grid>
        </Container>
    )
}

export default UserEditPage