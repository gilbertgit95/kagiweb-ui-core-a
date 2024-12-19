import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountAccountConfigReadOnlyView from './accountWorkspaceAccountRefAccountConfigReadOnlyView';
import AccountService from '../account/accountService';
import { IAccount } from '../../types/account';
import {
  useParams
} from 'react-router-dom';

const AccountWorkspaceAccountRefAccountConfigPage = () => {
    const { accountId, workspaceId, accountRefId, accountConfigId } = useParams()
    const navigate = useNavigate()
    const [configAndErrors, setConfigAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [pageState, setPageState] = useState({
        disableEditButton: false,
        disableDeleteButton: false,
        deleteDialogOpen: false
    })
    const [account, setAccount] = useState<IAccount | undefined>()
    
    useEffect(() => {
        const init = async () => {
            console.log('View: ', accountId, accountConfigId)

            if (accountId && accountConfigId) {
                try {
                    const accountResp = await AccountService.getAccount(accountId)
                    setAccount(accountResp.data)

                } catch (err:any) {
                    setPageState({
                        disableEditButton: true,
                        disableDeleteButton: true,
                        deleteDialogOpen: false
                    })

                    setConfigAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [accountId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account Workspace Account Ref Config Readonly View'} subtitle={ account?.nameId } />
                    <Divider />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="text"
                        startIcon={<ArrowBackIosNewIcon />}
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Grid>
                <Grid item xs={6} style={{alignContent: 'right'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                        <Button
                            variant="text"
                            startIcon={<EditIcon />}
                            disabled={ pageState.disableEditButton }
                            onClick={() => navigate(`/accounts/edit/${ account?._id }/workspaces/${ workspaceId }/accountRefs/${ accountRefId }/accountConfigs/${ accountConfigId }`)}>
                            Edit
                        </Button>
                    </Box>
                </Grid>

                <AccountAccountConfigReadOnlyView
                    account={account}
                    workspaceId={workspaceId || ''}
                    accountRefId={accountRefId || ''}
                    accountConfigId={accountConfigId} />

                <Grid item xs={12}>
                    <ResponseStatus {...configAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountWorkspaceAccountRefAccountConfigPage