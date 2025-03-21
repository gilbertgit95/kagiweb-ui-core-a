import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { useAppSelector} from '../../stores/appStore';
import InvitationView from './invitationView';

const AccountAccountActionPage = () => {
    const accountData = useAppSelector(state => state.signedInAccount.accountData)
    const { accountId, actionType, moduleType, moduleId, subModuleType, subModuleId, refType, refId } = useParams()

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account Account Action'} />
                    <Divider />
                </Grid>
                {/* <Typography>{ accountId + ' | ' + actionType + ' | ' + moduleType + ' | ' + moduleId + ' | ' + reftype + ' | ' + refId }</Typography> */}
                <Grid item xs={12}>
                    <InvitationView accountId='' toAccountId='' {...{actionType, moduleType, moduleId, subModuleType, subModuleId, refType, refId}}  />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountAccountActionPage