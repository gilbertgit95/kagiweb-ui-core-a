import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
import Grid from '@mui/material/Grid';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { Button } from '@mui/material';
import { IUser, IClientDevice } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';
import ShortendDescription from '../../components/texts/shortendDescription';

interface IProps {
    user: IUser | undefined
}

interface IClientDeviceRow {
    _id: string,
    ua: string,
    description: string,
    accessTokens: number,
    disabled: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const UserClientDevicesReadOnlyView = ({user}:IProps) => {
    const [data, setData] = useState<IClientDeviceRow[]>([])

    useEffect(() => {
        if (user && user.clientDevices) {
            const transformedData:IClientDeviceRow[] = user.clientDevices.map((item:IClientDevice & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '',
                    ua: item.ua,
                    description: item.description || '--',
                    accessTokens: item.accessTokens?.length || 0,
                    disabled: Boolean(item.disabled),
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            })
            setData(transformedData)
        }

    }, [user])

    const colDef:IColDef[] = [
        {
            header: 'User Agent',
            field: '',
            Component: (props:IClientDeviceRow) => {
                return <ShortendDescription value={props.ua} />
            }
        },
        {
            header: 'Description',
            field: '',
            Component: (props:IClientDeviceRow) => {
                return <ShortendDescription value={props.description} />
            }
        },
        {
            header: 'Tokens',
            field: 'accessTokens'
        },
        {
            header: 'Disabled',
            field: 'disabled',
            Component: (props:IClientDeviceRow) => {
                return <Check value={props.disabled} />
            }
        },
        {
            header: 'Changed',
            field: '',
            Component: (props:IClientDeviceRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: '',
            field: 'accessTokens',
            Component: (props:IClientDeviceRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View Client Device" />
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

export default UserClientDevicesReadOnlyView