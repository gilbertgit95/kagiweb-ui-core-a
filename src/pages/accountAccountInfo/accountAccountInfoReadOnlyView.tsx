import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import AccountAccountInfoService from './accountAccountInfoService';
import { IAccount, IAccountInfo } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface props {
    account?: IAccount,
    accountInfoId?: string
}

const AccountAccountInfoReadOnlyView = ({account, accountInfoId}:props) => {
    const [accountInfo, setAccountInfo] = useState<IAccountInfo & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (account && account.accountInfos && accountInfoId) {
            const usrInf = AccountAccountInfoService.getAccountInfoById(account, accountInfoId)
            setAccountInfo(usrInf)
        }

    }, [account, accountInfoId])

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
        { field: 'Key', value: accountInfo?.key },
        { field: 'Value', value: accountInfo?.value },
        { field: 'Type', value: accountInfo?.type },
        { field: 'Created', value: moment(accountInfo?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(accountInfo?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) }
    ]

    return accountInfo? (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default AccountAccountInfoReadOnlyView