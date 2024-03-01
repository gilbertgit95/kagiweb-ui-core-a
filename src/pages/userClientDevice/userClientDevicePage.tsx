import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';

import PrimaryHeader from '../../components/headers/primaryHeader';
import { IUser } from '../../types/user';
import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import UserService from '../user/userService';
import UserClientDeviceReadOnlyView from './userClientDeviceReadOnlyView';

const UserClientDevicePage = () => {
    const { userId, clientDeviceId } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState<IUser | undefined>()
    const [infoAndErrors, setInfoAndErrors] = useState<TResponseStatus>({
        errorMessages: [],
        infoMessages: []
    })

    useEffect(() => {
        const init = async () => {
            if (userId) {
                try {
                    const userResp = await UserService.getUser(userId)
                    setUser(userResp.data)
                } catch (err:any) {
                    console.log(err)
                    setInfoAndErrors({
                        ...{infoMessages: []},
                        ...{errorMessages: [err?.response?.data?.message || '']}
                    })
                }
            }
        }
        console.log('initiate Client Device page')
        init()
    }, [userId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'User Client Device View'} subtitle={ user?.username } />
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
                            onClick={() => navigate(`/users/edit/${ userId }/clientDevices/${ clientDeviceId }`)}>
                            Edit
                        </Button>
                    </Box>
                </Grid>

                <UserClientDeviceReadOnlyView user={user} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserClientDevicePage