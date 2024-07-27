import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { IAccount, IPassword } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface IProps {
    account: IAccount | undefined
}

interface IPasswordRow {
    _id: string,
    isActive: boolean,
    expTime: string,
    createdAt?: Date,
    updatedAt?: Date
}

const AccountPasswordsReadOnlyView = ({account}:IProps) => {
    const [data, setData] = useState<IPasswordRow[]>([])

    useEffect(() => {
        if (account && account.passwords) {
            const transformedData:IPasswordRow[] = account.passwords.map((item:IPassword & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '',
                    isActive: Boolean(item.isActive),
                    expTime: item?.expTime? moment(item?.expTime).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--',
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            })
            // console.log(transformedData)
            setData(transformedData.sort((a) => a.isActive? -1:1))
        }

    }, [account])

    const colDef:IColDef[] = [
        {
            header: 'Active',
            field: 'isActive',
            Component: (props:IPasswordRow) => {
                return <Check value={props.isActive} />
            }
        },
        {
            header: 'Expiration',
            field: 'expTime',
            Component: undefined
        },
        {
            header: 'Changed',
            field: '',
            Component: (props:IPasswordRow) => {
                return <DateChanges {...props} />
            }
        },
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

export default AccountPasswordsReadOnlyView