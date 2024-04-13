import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { IUser, IPassword } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import Config from '../../config';

interface IProps {
    user: IUser | undefined
}

interface IPasswordRow {
    _id: string,
    isActive: boolean,
    expTime: string,
    createdAt: string,
}

const UserPasswordsReadOnlyView = ({user}:IProps) => {
    const [data, setData] = useState<IPasswordRow[]>([])

    useEffect(() => {
        if (user && user.passwords) {
            const transformedData:IPasswordRow[] = user.passwords.map((item:IPassword & {createdAt?: Date}) => {
                return {
                    _id: item._id || '',
                    isActive: Boolean(item.isActive),
                    expTime: item?.expTime? moment(item?.expTime).format(Config.defaultDateTimeFormat): '--',
                    createdAt: moment(item?.createdAt).format(Config.defaultDateTimeFormat)
                }
            })
            // console.log(transformedData)
            setData(transformedData.sort((a) => a.isActive? -1:1))
        }

    }, [user])

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
            header: 'Created',
            field: 'createdAt',
            Component: undefined
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

export default UserPasswordsReadOnlyView