import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import AccountContactInfoReadOnlyView from './accountLimitedTransactionReadOnlyView';
import AccountService from '../account/accountService';
import { IAccount } from '../../types/account';
import {
  useParams
} from 'react-router-dom';

const AccountLimitedTransactionPage = () => {
    const { accountId, limitedTransactionId } = useParams()
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

    // const onDelete = async () => {
    //     if (accountId && limitedTransactionId) {
    //         try {
    //             // await AccountLimitedTransactionService.deleteContactInfo(accountId, limitedTransactionId)
    //             // const accountResp = await AccountService.getAccount(accountId)
    //             // setAccount(accountResp.data)
    //             setPageState({
    //                 disableEditButton: true,
    //                 disableDeleteButton: true,
    //                 deleteDialogOpen: false
    //             })
    //             setInfoAndErrors({
    //                 ...{infoMessages: ['Sucessfully deleted this account info']},
    //                 ...{errorMessages: []}
    //             })
    //         } catch (err:any) {
    //             setPageState({...pageState, ...{
    //                 deleteDialogOpen: false
    //             }})
    //             setInfoAndErrors({
    //                 ...{infoMessages: []},
    //                 ...{errorMessages: [err?.response?.data?.message || '']}
    //             })
    //         }
    //     }
    // }
    
    useEffect(() => {
        const init = async () => {

            if (accountId) {
                try {
                    const accountResp = await AccountService.getAccount(accountId)
                    setAccount(accountResp.data)

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
    }, [accountId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Limited Transaction Readonly View'} subtitle={ account?.nameId } />
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
                            onClick={() => navigate(`/accounts/edit/${ account?._id }/limitedTransactions/${ limitedTransactionId }`)}>
                            Edit
                        </Button>
                    </Box>
                </Grid>

                <AccountContactInfoReadOnlyView
                    account={account}
                    limitedTransactionId={limitedTransactionId} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountLimitedTransactionPage