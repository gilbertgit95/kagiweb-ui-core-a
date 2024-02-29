import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { IUser, IUserInfo } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Config from '../../config';

interface IProps {
    user: IUser | undefined
}

interface IUserInfoRow {
    _id: string,
    key: string,
    value: string,
    type: string,
    createdAt: string,
    updatedAt: string
}

const UserUserInfosReadOnlyView = ({user}:IProps) => {
    const [data, setData] = useState<IUserInfoRow[]>([])

    useEffect(() => {
        if (user && user.userInfos) {
            const transformedData:IUserInfoRow[] = user.userInfos.map((item:IUserInfo & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '',
                    key: item.key || '--',
                    value: item.value || '--',
                    type: item.type || '--',
                    createdAt: moment(item.createdAt).format(Config.defaultDateTimeFormat),
                    updatedAt: moment(item.updatedAt).format(Config.defaultDateTimeFormat)
                }
            })
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [user])

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
            field: 'type'
        },
        {
            header: 'Created',
            field: 'createdAt'
        },
        {
            header: 'Updated',
            field: 'updatedAt'
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

export default UserUserInfosReadOnlyView