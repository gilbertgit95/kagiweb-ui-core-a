import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { useAppSelector} from '../../stores/appStore';
// import NotificationsView from './notificationsView';
// import NotificationService from './notificationService';
import appComponentsHandler from '../../utils/appComponentsHandler'

import AppUtils from '../../utils/appUtils';

const OwnerAccountWorkspaceAction = () => {
    const accountData = useAppSelector(state => state.signedInAccount.accountData)
    const { actionType, moduleType, moduleId, subModuleType, subModuleId, refId } = useParams()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Workspace Action'} />
                    <Divider />
                </Grid>
                <Typography>{ actionType + ' - ' + moduleType + ' - ' + moduleId + ' - ' + subModuleType + ' - ' + subModuleId + ' - ' + refId }</Typography>
                {/* <NotificationsView
                    getFunc={NotificationService.getOwnerNotifications}
                    updateFunc={NotificationService.updateOwnerNotification}
                    accountId={accountData?._id || ''}
                    pageQuery={pageQuery}
                    pageSizeQuery={pageSizeQuery}
                    onReload={async () => {
                        await AppUtils.loadActiveNotifications()
                    }} /> */}
            </Grid>
        </Container>
    )
}

export default OwnerAccountWorkspaceAction