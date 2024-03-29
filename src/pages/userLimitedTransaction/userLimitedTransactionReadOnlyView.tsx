import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import UserLimitedTransactionService from './userLimitedTransactionService';
import { IUser, ILimitedTransaction } from '../../types/user';
import Config from '../../config';

interface props {
    user?: IUser,
    limitedTransactionId?: string
}

const UserLimitedTransactionReadOnlyView = ({user, limitedTransactionId}:props) => {
    const [limitedtransaction, setLimitedTransaction] = useState<ILimitedTransaction & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (user && user.limitedTransactions && limitedTransactionId) {
            const lt = UserLimitedTransactionService.getLimitedTransactionById(user, limitedTransactionId)
            setLimitedTransaction(lt)
        }

    }, [user, limitedTransactionId])

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
        { field: 'Expiration', value: moment(limitedtransaction?.expTime).format(Config.defaultDateTimeFormat) === 'Invalid date'? '--': moment(limitedtransaction?.expTime).format(Config.defaultDateTimeFormat) },
        { field: 'Recipient', value: limitedtransaction?.recipient || '--' },
        { field: 'Disabled', value: Boolean(limitedtransaction?.disabled)? 'True': 'False' },
        { field: 'Created', value: moment(limitedtransaction?.createdAt).format(Config.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(limitedtransaction?.updatedAt).format(Config.defaultDateTimeFormat) }
    ]

    return limitedtransaction? (
        <Grid item xs={12}>
            <PrimaryTable
                maxHeight={700}
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default UserLimitedTransactionReadOnlyView