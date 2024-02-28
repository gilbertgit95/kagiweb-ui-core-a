import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { IUser, ILimitedTransaction } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import Config from '../../config';

interface IProps {
    user: IUser | undefined
}

interface ILimitedTransactionRow {
    _id: string,
    limit: number,
    attempts: number,
    type: string,
    key: string,
    value: string,
    expTime: string,
    recipient: string,
    disabled: boolean,
}

const UserLimitedTransactionsReadOnlyView = ({user}:IProps) => {
    const [data, setData] = useState<ILimitedTransactionRow[]>([])

    useEffect(() => {
        if (user && user.limitedTransactions) {
            const transformedData:ILimitedTransactionRow[] = user.limitedTransactions.map((item:ILimitedTransaction & {createdAt?: Date}) => {
                return {
                    _id: item._id || '',
                    limit: item.limit,
                    attempts: item.attempts,
                    type: item.type,
                    key: item.key || '',
                    value: item.value || '',
                    expTime: moment(item.expTime).format(Config.defaultDateTimeFormat),
                    recipient: item.recipient || '',
                    disabled: Boolean(item.disabled)
                }
            })
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [user])

    const colDef:IColDef[] = [
        {
            header: 'Limit',
            field: 'limit'
        },
        {
            header: 'Attempts',
            field: 'attempts'
        },
        {
            header: 'Type',
            field: 'type'
        },
        {
            header: 'Key',
            field: 'key'
        },
        {
            header: 'Value',
            field: 'value'
        },
        {
            header: 'Expiration',
            field: 'expTime'
        },
        {
            header: 'Recipient',
            field: 'recipient'
        },
        {
            header: 'Disabled',
            field: 'disabled',
            Component: (props:ILimitedTransactionRow) => {
                return <Check value={props.disabled} />
            }
        }
    ]

    return (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    )
}

export default UserLimitedTransactionsReadOnlyView