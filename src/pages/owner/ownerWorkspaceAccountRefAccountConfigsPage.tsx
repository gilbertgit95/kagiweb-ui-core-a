import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IAccount } from '../../types/account';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import OwnerService from './ownerService';
import AccountAccountConfigsReadOnlyView from '../accountWorkspaceAccountRefAccountConfig/accountWorkspaceAccountRefAccountConfigsReadOnlyView';

const OwnerWorkspaceAccountRefAccountConfigsPage = () => {
    const navigate = useNavigate()
    const { workspaceId, accountRefId } = useParams()
    const [account, setAccount] = useState<IAccount | undefined>()
    const [infoAndErrors, setConfigAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    useEffect(() => {
        const init = async () => {
            try {
                const accountResp = await OwnerService.getOwner()
                setAccount(accountResp.data)
            } catch (err:any) {
                console.log(err)
                setConfigAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
        console.log('initiate accountConfig features page')
        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Workspace Account Ref Configs View'} subtitle={ account?.nameId } />
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

                <AccountAccountConfigsReadOnlyView
                    account={account}
                    workspaceId={workspaceId || ''}
                    accountRefId={accountRefId || ''} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerWorkspaceAccountRefAccountConfigsPage