import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Divider, Typography, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Grid from '@mui/material/Grid';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { useAppSelector} from '../../stores/appStore';
import InvitationView from './invitationView';

const OwnerAccountWorkspaceActionPage = () => {
    const navigate = useNavigate()
    const { actionType, moduleType, moduleId, subModuleType, subModuleId, refType, refId } = useParams()
    const accountData = useAppSelector(state => state.signedInAccount.accountData)
    const accountId = accountData?._id

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Account Workspace Action'} />
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
                {/* <Typography>{ actionType + ' | ' + moduleType + ' | ' + moduleId + ' | ' + subModuleType + ' | ' + subModuleId + ' | ' + refType + ' | ' + refId }</Typography> */}
                <Grid item xs={12}>
                    <InvitationView {...{accountId, actionType, moduleType, moduleId, subModuleType, subModuleId, refType, refId}} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerAccountWorkspaceActionPage