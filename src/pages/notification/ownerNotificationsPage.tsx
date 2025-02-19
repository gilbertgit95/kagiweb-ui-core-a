import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { useSearchParams } from 'react-router-dom';

import NotificationsView from './notificationsView';
import NotificationService from './notificationService';
import appComponentsHandler from '../../utils/appComponentsHandler'

const Notifications = () => {
    const [searchParams] = useSearchParams();
    const { accountId } = useParams()
    const pageQuery = parseInt(searchParams.get('page') || '') || appComponentsHandler.appConfig.defaultPage;
    const pageSizeQuery = parseInt(searchParams.get('pageSize') || '') || appComponentsHandler.appConfig.defaultPageSize;

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Notifications View'} />
                    <Divider />
                </Grid>
                <NotificationsView
                    getFunc={NotificationService.getAccountNotifications}
                    updateFunc={NotificationService.updateAccountNotification}
                    accountId={accountId || ''}
                    pageQuery={pageQuery}
                    pageSizeQuery={pageSizeQuery} />
            </Grid>
        </Container>
    )
}

export default Notifications