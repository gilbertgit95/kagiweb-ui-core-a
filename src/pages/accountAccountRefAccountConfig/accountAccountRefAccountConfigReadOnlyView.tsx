import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import AccountAccountConfigService from './accountAccountRefAccountConfigService';
import { IAccount, IAccountConfig } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface props {
    account?: IAccount,
    accountRefId: string,
    accountConfigId?: string
}

const AccountAccountRefAccountConfigReadOnlyView = ({account, accountRefId, accountConfigId}:props) => {
    const [accountConfig, setAccountConfig] = useState<IAccountConfig & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (account && account.accountConfigs && accountConfigId) {
            const usrInf = AccountAccountConfigService.getAccountAccountRefAccountConfigById(account, accountRefId, accountConfigId)
            setAccountConfig(usrInf)
        }

    }, [account, accountConfigId])

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
        { field: 'Key', value: accountConfig?.key },
        { field: 'Value', value: accountConfig?.value },
        { field: 'Type', value: accountConfig?.type },
        { field: 'Created', value: moment(accountConfig?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(accountConfig?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) }
    ]

    return accountConfig? (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default AccountAccountRefAccountConfigReadOnlyView