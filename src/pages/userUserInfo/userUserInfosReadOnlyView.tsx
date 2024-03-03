import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
    const navigate = useNavigate()
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
        },
        {
            header: '',
            field: '_id',
            Component: (props:IUserInfoRow) => {
    
                return (
                    <Button
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(props._id)}
                        variant="text">View User Info</Button>
                )
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

export default UserUserInfosReadOnlyView