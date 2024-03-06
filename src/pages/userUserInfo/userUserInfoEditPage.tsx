import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Box, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import ResponseStatus, { TResponseStatus } from '../../components/infoOrWarnings/responseStatus';
import PrimaryHeader from '../../components/headers/primaryHeader';
import UserUserInfoEditForm from './userUserInfoEditForm';
import UserService from '../user/userService';
import { IUser } from '../../types/user';
import {
  useParams
} from 'react-router-dom';

const UserInfoEditPage = () => {
    const { userId, userInfoId } = useParams()
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
    const [user, setUser] = useState<IUser | undefined>()
    
    useEffect(() => {
        const init = async () => {
            console.log('View: ', userId)

            if (userId) {
                try {
                    const userResp = await UserService.getUser(userId)
                    setUser(userResp.data)

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
    }, [userId])

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryHeader title={'User Info Update View'} subtitle={ user?.username } />
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

                <UserUserInfoEditForm
                    userId={userId}
                    userInfoId={userInfoId} />

                <Grid item xs={12}>
                    <ResponseStatus {...infoAndErrors} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserInfoEditPage