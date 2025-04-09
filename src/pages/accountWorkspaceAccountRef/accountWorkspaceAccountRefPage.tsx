import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountWorkspaceAccountRefReadOnlyView from './accountWorkspaceAccountRefReadOnlyView';
import AccountService from '../account/accountService';
import AccountWorkspaceAccountRefService from './accountWorkspaceAccountRefService';
import { IAccount, IWorkspaceAccountRef } from '../../types/account';
import {
  useParams
} from 'react-router-dom';

const AccountWorkspaceAccountRefPage = () => {
    const { accountId, workspaceId, accountRefId } = useParams()
    const navigate = useNavigate()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })
    const [pageState, setPageState] = useState({
        disableEditButton: false,
        disableDeleteButton: false,
        deleteDialogOpen: false
    })
    const [account, setAccount] = useState<IAccount | undefined>()
    const [accountRef, setAccountRef] = useState<IWorkspaceAccountRef | undefined>()

    const onDelete = async () => {
        if (accountId && workspaceId && accountRefId) {
            try {
                await AccountWorkspaceAccountRefService.deleteWorkspaceAccountRef(accountId, workspaceId, accountRefId)
                const accountResp = await AccountService.getAccount(accountId)
                setAccount(accountResp.data)
                setPageState({
                    disableEditButton: true,
                    disableDeleteButton: true,
                    deleteDialogOpen: false
                })
                setInfoAndErrors({
                    ...{infoMessages: ['Sucessfully deleted this account reference']},
                    ...{errorMessages: []}
                })
            } catch (err:any) {
                setPageState({...pageState, ...{
                    deleteDialogOpen: false
                }})
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
    }
    
    useEffect(() => {
        const init = async () => {
            console.log('View: ', accountId, workspaceId)

            if (accountId && workspaceId) {
                try {
                    const accountResp = await AccountService.getAccount(accountId)
                    const accountRefResp = await AccountWorkspaceAccountRefService.getWorkspaceAccountRef(accountId, workspaceId, accountRefId || '')
                    
                    setAccount(accountResp.data)
                    setAccountRef(accountRefResp.data || undefined)

                } catch (err:any) {
                    setPageState({
                        disableEditButton: true,
                        disableDeleteButton: true,
                        deleteDialogOpen: false
                    })

                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }

        init()
    }, [accountId, workspaceId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Account Workspace Account reference Readonly View'} subtitle={ account?.nameId } />
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
                            startIcon={<LocalPostOfficeIcon />}
                            disabled={ !accountRef }
                            onClick={() => navigate(`/accounts/view/${ accountRef?.accountId }/actions/invitation/module/account/${ accountId }/subModule/workspace/${ workspaceId }/ref/accountRef/${ accountRefId }`)}>
                            View Invitation
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<EditIcon />}
                            disabled={ pageState.disableEditButton }
                            onClick={() => navigate(`/accounts/edit/${ account?._id }/workspaces/${ workspaceId }/accountRefs/${ accountRefId }`)}>
                            Edit
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<DeleteIcon />}
                            color="secondary"
                            disabled={ pageState.disableDeleteButton }
                            onClick={ () => setPageState({...pageState, ...{deleteDialogOpen: true}}) }>
                            Delete
                        </Button>
                        <Dialog
                            open={pageState.deleteDialogOpen}
                            onClose={() => setPageState({...pageState, ...{deleteDialogOpen: false}})}>
                            <DialogTitle>
                                Warning
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this account reference?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setPageState({...pageState, ...{deleteDialogOpen: false}})}>
                                    no
                                </Button>
                                <Button onClick={onDelete} autoFocus>
                                    yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                </Grid>

                <AccountWorkspaceAccountRefReadOnlyView
                    account={account}
                    workspaceId={workspaceId}
                    accountRefId={accountRefId}
                    getFunc={AccountWorkspaceAccountRefService.getWorkspaceAccountRef} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountWorkspaceAccountRefPage