import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IUser } from '../../types/user';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
// import UserService from '../user/userService';
import OwnerService from './ownerService';
import UserClientDeviceTokensReadOnlyView from '../userClientDeviceToken/userClientDeviceTokensReadOnlyView';

const UserClientDeviceTokensPage = () => {
    const { clientDeviceId } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState<IUser | undefined>()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    useEffect(() => {
        const init = async () => {
            try {
                const userResp = await OwnerService.getOwner()
                setUser(userResp.data)
            } catch (err:any) {
                console.log(err)
                setInfoAndErrors({
                    ...{infoMessages: []},
                    ...{errorMessages: [err?.response?.data?.message || '']}
                })
            }
        }
        console.log('initiate owner ClientDeviceToken features page')
        init()
    }, [])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'My Account Client Device Tokens View'} subtitle={ user?.username } />
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
                            onClick={() => navigate(`/owner/create/clientDevices/${ clientDeviceId }/clientDeviceTokens`)}>
                            Create
                        </Button>
                    </Box>
                </Grid>

                <UserClientDeviceTokensReadOnlyView user={user} clientDeviceId={ clientDeviceId } />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserClientDeviceTokensPage