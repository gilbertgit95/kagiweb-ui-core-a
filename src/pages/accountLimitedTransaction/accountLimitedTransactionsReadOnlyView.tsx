import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { IAccount, ILimitedTransaction } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface IProps {
    account: IAccount | undefined
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
    createdAt?: Date,
    updatedAt?: Date
}

const AccountLimitedTransactionsReadOnlyView = ({account}:IProps) => {
    // const navigate = useNavigate()
    const [data, setData] = useState<ILimitedTransactionRow[]>([])

    useEffect(() => {
        if (account && account.limitedTransactions) {
            const transformedData:ILimitedTransactionRow[] = account.limitedTransactions.map((item:ILimitedTransaction & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '',
                    limit: item.limit,
                    attempts: item.attempts,
                    type: item.type,
                    key: item.key || '',
                    value: item.value || '',
                    expTime: moment(item.expTime).format(appComponentsHandler.appConfig.defaultDateTimeFormat),
                    recipient: item.recipient || '',
                    disabled: Boolean(item.disabled),
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            })
            setData(transformedData)
        }

    }, [account])

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
        },
        {
            header: 'Changed',
            field: '',
            Component: (props:ILimitedTransactionRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: '',
            field: '',
            Component: (props:ILimitedTransactionRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View LT" />
                )
            }
        }
    ]

    return (
        <Grid item xs={12}>
            <PrimaryTable
                maxHeight={700}
                columnDefs={colDef}
                data={data} />
        </Grid>
    )
}

export default AccountLimitedTransactionsReadOnlyView