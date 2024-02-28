import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { IUser, IContactInfo } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import Config from '../../config';

interface IProps {
    user: IUser | undefined
}

interface IContactInfoRow {
    _id: string,
    type: string,
    value: string,
    countryCode: string,
    verified: boolean,
    createdAt: string,
    updatedAt: string
}

const UserContactInfosReadOnlyView = ({user}:IProps) => {
    const [data, setData] = useState<IContactInfoRow[]>([])

    useEffect(() => {
        if (user && user.contactInfos) {
            const transformedData:IContactInfoRow[] = user.contactInfos.map((item:IContactInfo & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '',
                    type: item.type || '--',
                    value: item.value || '--',
                    countryCode: item.countryCode || '--',
                    verified: Boolean(item.verified),
                    createdAt: moment(item.createdAt || '').format(Config.defaultDateTimeFormat),
                    updatedAt: moment(item.updatedAt || '').format(Config.defaultDateTimeFormat)
                }
            })
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [user])

    const colDef:IColDef[] = [
        {
            header: 'Value',
            field: 'value'
        },
        {
            header: 'Type',
            field: 'type'
        },
        {
            header: 'Country Code',
            field: 'countryCode'
        },
        {
            header: 'Created',
            field: 'createdAt'
        },
        {
            header: 'Updated',
            field: 'updatedAt'
        },
        {
            header: 'Verified',
            field: 'verified',
            Component: (props:IContactInfoRow) => {
                return <Check value={props.verified} />
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

export default UserContactInfosReadOnlyView