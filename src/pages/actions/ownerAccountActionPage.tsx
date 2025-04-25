import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Grid from '@mui/material/Grid';

import PrimaryHeader from '../../components/headers/primaryHeader';
// import { useAppSelector} from '../../stores/appStore';
import InvitationView from './invitationView';
import ActionService from './actionService';

const OwnerAccountActionPage = () => {
    // const accountData = useAppSelector(state => state.signedInAccount.accountData)
    const { accountId, actionType, moduleType, moduleId, refType, refId } = useParams()
    const navigate = useNavigate()
    // const accountId = accountData?._id

    // console.log(`
    //     accountId: ${accountId},
    //     actionType: ${actionType}, 
    //     moduleType: ${moduleType},
    //     moduleId: ${moduleId}, 
    //     subModuleType: ${subModuleType},
    //     subModuleId: ${subModuleId},
    //     refType: ${refType},
    //     refId: ${refId}
    // `)

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Account Action'} />
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
                            return ActionService.getOwnerActionInfo(
                                accountId || '',
                                actionType || '',
                                moduleType || '',
                                moduleId || '',
                                refType || '',
                                refId || ''
                            )
                        }}
                        onAccept={async () => {
                            return ActionService.acceptOrDeclineOwnerActionInfo(
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
                            return ActionService.acceptOrDeclineOwnerActionInfo(
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

export default OwnerAccountActionPage