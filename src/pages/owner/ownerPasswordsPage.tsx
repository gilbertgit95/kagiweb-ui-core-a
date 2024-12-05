import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IAccount } from '../../types/account';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import OwnerService from './ownerService';
import AccountPasswordsReadOnlyView from '../accountPassword/accountPasswordsReadOnlyView';

const OwnerPasswordsPage = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState<IAccount | undefined>()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
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
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
        console.log('initiate owner passwords page')
        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Passwords View'} subtitle={ account?.nameId } />
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
                            onClick={() => navigate(`/owner/create/passwords`)}>
                            Change Password
                        </Button>
                    </Box>
                </Grid>

                <AccountPasswordsReadOnlyView account={account} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default OwnerPasswordsPage