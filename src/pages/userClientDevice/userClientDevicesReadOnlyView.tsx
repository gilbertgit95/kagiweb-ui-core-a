import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';
import { IUser, IClientDevice, IParsedClientDevice } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import Config from '../../config';

interface IProps {
    user: IUser | undefined
}

interface IClientDeviceRow {
    _id: string,
    ua: string,
    accessTokens: number,
    // type: string,
    // key: string,
    // value: string,
    // expTime: string,
    // recipient: string,
    disabled: boolean,
}

const UserClientDevicesReadOnlyView = ({user}:IProps) => {
    const [data, setData] = useState<IClientDeviceRow[]>([])

    useEffect(() => {
        if (user && user.clientDevices) {
            const transformedData:IClientDeviceRow[] = user.clientDevices.map((item:IClientDevice & {createdAt?: Date}) => {
                return {
                    _id: item._id || '',
                    ua: item.ua,
                    accessTokens: item.accessTokens?.length || 0,
                    // type: item.type,
                    // key: item.key || '',
                    // value: item.value || '',
                    // expTime: moment(item.expTime).format(Config.defaultDateTimeFormat),
                    // recipient: item.recipient || '',
                    disabled: Boolean(item.disabled)
                }
            })
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [user])

    const colDef:IColDef[] = [
        {
            header: 'User Agent',
            field: 'ua'
        },
        // {
        //     header: 'Type',
        //     field: 'type'
        // },
        // {
        //     header: 'Key',
        //     field: 'key'
        // },
        // {
        //     header: 'Value',
        //     field: 'value'
        // },
        // {
        //     header: 'Expiration',
        //     field: 'expTime'
        // },
        // {
        //     header: 'Recipient',
        //     field: 'recipient'
        // },
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
            header: '',
            field: 'accessTokens',
            Component: (props:IClientDeviceRow) => {
                const navigate = useNavigate()
    
                return (
                    <Button
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`${ props._id }`)}
                        variant="text">View User Agent</Button>
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

export default UserClientDevicesReadOnlyView