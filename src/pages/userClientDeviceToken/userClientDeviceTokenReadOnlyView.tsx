import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import UserClientDeviceTokenService from './userClientDeviceTokenService';
import { IUser, IAccessToken } from '../../types/user';
import Config from '../../config';

interface props {
    user?: IUser,
    clientDeviceId?: string,
    clientDeviceTokenId?: string
}

const UserClientDeviceTokenReadOnlyView = ({user, clientDeviceId, clientDeviceTokenId}:props) => {
    const [token, setToken] = useState<IAccessToken & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (user && user.contactInfos && clientDeviceId) {
            const tkn = UserClientDeviceTokenService.getClientDeviceAccessTokenById(user, clientDeviceId, clientDeviceTokenId || '')
            setToken(tkn)
        }

    }, [user, clientDeviceId, clientDeviceTokenId])

    const colDef:IColDef[] = [
        {
            header: 'Field',
            field: 'field'
        },
        {
            header: 'Value',
            field: 'value'
        }
    ]

    const data:{field: string, value: string|undefined}[] = [
        { field: 'JWT', value: token?.jwt },
        { field: 'Description', value: token?.description },
        { field: 'IP Address', value: token?.ipAddress },
        { field: 'Expiration', value: token?.expTime? moment(token?.expTime).format(Config.defaultDateTimeFormat): '--' },
        { field: 'Disabled', value: token?.disabled? 'True': 'False' },
        { field: 'Created', value: moment(token?.createdAt).format(Config.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(token?.updatedAt).format(Config.defaultDateTimeFormat) }
    ]

    return token? (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default UserClientDeviceTokenReadOnlyView