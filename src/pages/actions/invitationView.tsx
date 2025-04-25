import React, { useState, useEffect } from 'react';
import moment from 'moment';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';
import { IAccountActionInfo } from '../../types/action';
import appComponentsHandler from '../../utils/appComponentsHandler'

const fontStyle = {
    fontWeight: '700',
    fontStyle: 'italic',
    display: 'inline'
}

interface IProps {
    fetchData?: () => Promise<any>,
    onAccept?: () => Promise<any>,
    onDecline?: () => Promise<any>,
}

export default function InvitationView(props: IProps) {
    const [data, setData] = useState<IAccountActionInfo|undefined>()

    useEffect(() => {
        const init = async () => {
            if (props.fetchData) {
                const response = await props.fetchData()
                // console.log(response.data)
                setData(response.data)
            }
        }

        init()
    }, [])

    let title = ''
    if (data?.actionType === 'invitation') title =  'Invitation for'

    return (
        <Card sx={{ minWidth: 300, padding: '20px' }}>
            {
                data? (
                    <>
                        <CardContent>
                            <Stack direction="row" spacing={2}>
                                <LocalPostOfficeIcon sx={{ color: 'text.secondary' }} />
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>{ title }</Typography>
                            </Stack>
                            <Typography color="primary" variant="h5">{data.workspace? 'Workspace': 'Account'} Level Access</Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                Created on { data.ref.createdAt? moment(data.ref.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '' }
                            </Typography>

                            {
                                data.workspace? (
                                    // message workspace access invitation 
                                    <Typography variant="body1" style={{marginBottom: '10px', marginTop: '20px'}}>
                                        Hello <b>{ data.fromAccount.nameId }</b>, you are invited to join the workspace
                                        <b style={fontStyle}> { data.workspace.name } </b>
                                        under account
                                        <b style={fontStyle}> { data.toAccount.nameId } </b>
                                        with a role 
                                        <b style={fontStyle}> { data.refRole.name } </b>
                                        . Please accept the invitation.
                                    </Typography>
                                ): (
                                    // message account access invitation
                                    <Typography variant="body1" style={{marginBottom: '10px', marginTop: '20px'}}>
                                        Hello <b>{ data.fromAccount.nameId }</b>, you are invited to join the account
                                        <b style={fontStyle}> { data.toAccount.nameId } </b>
                                        with a role 
                                        <b style={fontStyle}> { data.refRole.name } </b>
                                        . Please accept the invitation.
                                    </Typography>
                                )
                            }

                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                disabled={data?.ref?.accepted || data?.ref?.declined || data?.ref?.disabled}
                                onClick={async () => {
                                    if (props.onAccept && props.fetchData) {
                                        await props.onAccept()
                                        const response = await props.fetchData()
                                        setData(response.data)
                                    }
                                }}>{ data?.ref?.accepted? 'Accepted': 'Accept' }</Button>
                            <Button
                                size="small"
                                disabled={data?.ref?.accepted || data?.ref?.declined || data?.ref?.disabled}
                                onClick={async () => {
                                    if (props.onDecline && props.fetchData) {
                                        await props.onDecline()
                                        const response = await props.fetchData()
                                        setData(response.data)
                                    }
                                }}>{ data?.ref?.declined? 'Declined': 'Decline' }</Button>
                        </CardActions>
                    </>
                ): (
                    <>
                        <Skeleton variant="rectangular" height={200} sx={{ marginBottom: '20px' }} />
                        <Skeleton variant="text" height={40} sx={{ marginBottom: '20px' }} />
                    </>
                )
            }
        </Card>
    );
}