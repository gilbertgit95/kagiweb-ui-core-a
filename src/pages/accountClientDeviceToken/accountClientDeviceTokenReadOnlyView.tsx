import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import AccountClientDeviceTokenService from './accountClientDeviceTokenService';
import { IAccount, IAccessToken } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface props {
    account?: IAccount,
    clientDeviceId?: string,
    clientDeviceTokenId?: string
}

const AccountClientDeviceTokenReadOnlyView = ({account, clientDeviceId, clientDeviceTokenId}:props) => {
    const [token, setToken] = useState<IAccessToken & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (account && account.contactInfos && clientDeviceId) {
            const tkn = AccountClientDeviceTokenService.getClientDeviceAccessTokenById(account, clientDeviceId, clientDeviceTokenId || '')
            setToken(tkn)
        }

    }, [account, clientDeviceId, clientDeviceTokenId])

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
        { field: 'Expiration', value: token?.expTime? moment(token?.expTime).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--' },
        { field: 'Disabled', value: token?.disabled? 'True': 'False' },
        { field: 'Created', value: moment(token?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(token?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) }
    ]

    return token? (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default AccountClientDeviceTokenReadOnlyView