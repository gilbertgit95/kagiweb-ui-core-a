import React from 'react';
// import { useParams } from 'react-router-dom';
import { Container, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector} from '../../stores/appStore';
import NotificationsView from './notificationsView';
import NotificationService from './notificationService';
import appComponentsHandler from '../../utils/appComponentsHandler'

import AppUtils from '../../utils/appUtils';

const Notifications = () => {
    const [searchParams] = useSearchParams();
    const accountData = useAppSelector(state => state.signedInAccount.accountData)
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
                    getFunc={NotificationService.getOwnerNotifications}
                    updateFunc={NotificationService.updateOwnerNotification}
                    accountId={accountData?._id || ''}
                    pageQuery={pageQuery}
                    pageSizeQuery={pageSizeQuery}
                    onReload={async () => {
                        await AppUtils.loadActiveNotifications()
                    }} />
            </Grid>
        </Container>
    )
}

export default Notifications