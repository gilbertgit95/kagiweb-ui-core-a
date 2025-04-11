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
import AccountAccountRefReadOnlyView from '../accountAccountRef/accountAccountRefReadOnlyView';
import OwnerService from './ownerService';
import { IAccount, IAccountAccountRef } from '../../types/account';
import {
  useParams
} from 'react-router-dom';

const OwnerAccountRefPage = () => {
    const { accountRefId } = useParams()
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
    const [accountRef, setAccountRef] = useState<IAccountAccountRef | undefined>()

    const onDelete = async () => {
        if (accountRefId) {
            try {
                await OwnerService.deleteAccountRef('', accountRefId)
                const accountResp = await OwnerService.getOwner()
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

            try {
                // console.log('owner account ref: ')
                const accountResp = await OwnerService.getOwner()
                const accountRefResp = await OwnerService.getAccountRef('', accountRefId || '')

                // console.log('accountRefResp: ', accountRefResp)

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

        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Account Reference Readonly View'} subtitle={ account?.nameId } />
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
                            onClick={() => navigate(`/owner/view/${ accountRef?.accountId }/actions/invitation/module/account/${ account?._id }/ref/accountRef/${ accountRefId }`)}>
                            View Invitation
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<EditIcon />}
                            disabled={ pageState.disableEditButton }
                            onClick={() => navigate(`/owner/edit/accountRefs/${ accountRefId }`)}>
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

                <AccountAccountRefReadOnlyView
                    account={account}
                    accountRefId={accountRefId}
                    getFunc={OwnerService.getAccountRef} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerAccountRefPage