import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { IAccount, IAccountInfo } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';

interface IProps {
    account: IAccount | undefined
}

interface IAccountInfoRow {
    _id: string,
    key: string,
    value: string,
    type: string,
    createdAt?: Date,
    updatedAt?: Date
}

const AccountAccountInfosReadOnlyView = ({account}:IProps) => {
    // const navigate = useNavigate()
    const [data, setData] = useState<IAccountInfoRow[]>([])

    useEffect(() => {
        if (account && account.accountInfos) {
            const transformedData:IAccountInfoRow[] = account.accountInfos.map((item:IAccountInfo & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '',
                    key: item.key || '--',
                    value: item.value || '--',
                    type: item.type || '--',
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            })
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [account])

    const colDef:IColDef[] = [
        {
            header: 'Key',
            field: 'key'
        },
        {
            header: 'Value',
            field: 'value'
        },
        {
            header: 'Type',
            field: 'type',
        },
        {
            header: 'Changed',
            field: '_id',
            Component: (props:IAccountInfoRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: '',
            field: '_id',
            Component: (props:IAccountInfoRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View Account Info" />
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

export default AccountAccountInfosReadOnlyView