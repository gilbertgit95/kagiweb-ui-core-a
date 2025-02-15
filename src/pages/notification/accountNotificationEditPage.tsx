import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountEditForm from './notificationEditForm';
import AccountService from './notificationService';
import {
  useParams
} from 'react-router-dom';

export const AccountEditPage = () => {
    let { accountId } = useParams()
    const navigate = useNavigate()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account Update View'} />
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
                <AccountEditForm
                    getFunc={AccountService.getAccount}
                    updateFunc={AccountService.updateAccount}
                    accountId={ accountId } />
            </Grid>
        </Container>
    )
}

export default AccountEditPage