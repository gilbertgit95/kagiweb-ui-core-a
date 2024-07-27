import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import AccountLimitedTransactionService from './accountLimitedTransactionService';
import { IAccount, ILimitedTransaction } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface props {
    account?: IAccount,
    limitedTransactionId?: string
}

const AccountLimitedTransactionReadOnlyView = ({account, limitedTransactionId}:props) => {
    const [limitedtransaction, setLimitedTransaction] = useState<ILimitedTransaction & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (account && account.limitedTransactions && limitedTransactionId) {
            const lt = AccountLimitedTransactionService.getLimitedTransactionById(account, limitedTransactionId)
            setLimitedTransaction(lt)
        }

    }, [account, limitedTransactionId])

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
        { field: 'Type', value: limitedtransaction?.type || '--' },
        { field: 'Limit', value: String(limitedtransaction?.limit) },
        { field: 'Attempts', value: String(limitedtransaction?.attempts) },
        { field: 'Key', value: limitedtransaction?.key || '--' },
        { field: 'Value', value: limitedtransaction?.value || '--' },
        { field: 'Expiration', value: moment(limitedtransaction?.expTime).format(appComponentsHandler.appConfig.defaultDateTimeFormat) === 'Invalid date'? '--': moment(limitedtransaction?.expTime).format(appComponentsHandler.appConfig.defaultDateTimeFormat) },
        { field: 'Recipient', value: limitedtransaction?.recipient || '--' },
        { field: 'Disabled', value: Boolean(limitedtransaction?.disabled)? 'True': 'False' },
        { field: 'Created', value: moment(limitedtransaction?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(limitedtransaction?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) }
    ]

    return limitedtransaction? (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default AccountLimitedTransactionReadOnlyView