import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IAccount } from '../../types/account';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import OwnerService from './ownerService';
import AccountContactInfosReadOnlyView from '../accountContactInfo/accountContactInfosReadOnlyView';

const AccountContactInfosPage = () => {
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
        console.log('initiate ContactInfo features page')
        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'Owner Contact Infos View'} subtitle={ account?.nameId } />
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
                            startIcon={<AddIcon />}
                            onClick={() => navigate(`/owner/create/contactInfos`)}>
                            Create
                        </Button>
                    </Box>
                </Grid>

                <AccountContactInfosReadOnlyView account={account} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountContactInfosPage