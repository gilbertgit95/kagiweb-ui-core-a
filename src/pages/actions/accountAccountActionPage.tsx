import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PrimaryHeader from '../../components/headers/primaryHeader';
// import { useAppSelector} from '../../stores/appStore';
import InvitationView from './invitationView';
import ActionService from './actionService';

const AccountAccountActionPage = () => {
    // const accountData = useAppSelector(state => state.signedInAccount.accountData)
    const { accountId, actionType, moduleType, moduleId, refType, refId } = useParams()
    const navigate = useNavigate()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account Account Action'} />
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
                <Grid item xs={12}>
                    <InvitationView
                        fetchData={async () => {
                            return ActionService.getAccountActionInfo(
                                accountId || '',
                                actionType || '',
                                moduleType || '',
                                moduleId || '',
                                refType || '',
                                refId || ''
                            )
                        }}
                        onAccept={async () => {
                            return ActionService.acceptOrDeclineAccountActionInfo(
                                accountId || '',
                                actionType || '',
                                moduleType || '',
                                moduleId || '',
                                refType || '',
                                refId || '',
                                true
                            )
                        }}
                        onDecline={async () => {
                            return ActionService.acceptOrDeclineAccountActionInfo(
                                accountId || '',
                                actionType || '',
                                moduleType || '',
                                moduleId || '',
                                refType || '',
                                refId || '',
                                false
                            )
                        }} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountAccountActionPage