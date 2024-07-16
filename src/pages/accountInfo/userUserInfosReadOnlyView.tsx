import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// import { Button } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { IAccount, IUserInfo } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';

interface IProps {
    user: IAccount | undefined
}

interface IUserInfoRow {
    _id: string,
    key: string,
    value: string,
    type: string,
    createdAt?: Date,
    updatedAt?: Date
}

const UserUserInfosReadOnlyView = ({user}:IProps) => {
    // const navigate = useNavigate()
    const [data, setData] = useState<IUserInfoRow[]>([])

    useEffect(() => {
        if (user && user.userInfos) {
            const transformedData:IUserInfoRow[] = user.userInfos.map((item:IUserInfo & {createdAt?: Date, updatedAt?: Date}) => {
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
            field: 'type',
        },
        {
            header: 'Changed',
            field: '_id',
            Component: (props:IUserInfoRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: '',
            field: '_id',
            Component: (props:IUserInfoRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View User Info" />
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

export default UserUserInfosReadOnlyView