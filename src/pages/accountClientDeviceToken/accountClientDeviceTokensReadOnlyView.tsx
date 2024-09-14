import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import { IAccount, IAccessToken } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';
import ShortendDescription from '../../components/texts/shortendDescription';
import AccountClientDeviceService from '../accountClientDevice/accountClientDeviceService';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface IProps {
    account: IAccount | undefined,
    clientDeviceId: string | undefined
}

interface IclientDeviceTokenRow {
    _id: string,
    jwt: string,
    description: string,
    ipAddress: string,
    expiration: string,
    disabled: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const AccountClientDeviceTokensReadOnlyView = ({account, clientDeviceId}:IProps) => {
    // const navigate = useNavigate()
    const [data, setData] = useState<IclientDeviceTokenRow[]>([])

    useEffect(() => {
        if (account && account.clientDevices && clientDeviceId) {
            const clientDevice = AccountClientDeviceService.getClientDeviceById(account, clientDeviceId)
            const transformedData:IclientDeviceTokenRow[] = clientDevice?.accessTokens?.map((item:IAccessToken & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '',
                    jwt: item.jwt,
                    description: item.description || '--',
                    ipAddress: item.ipAddress || '--',
                    expiration: item?.expTime? moment(item?.expTime).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--',
                    disabled: Boolean(item.disabled),
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            }) || []
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [account, clientDeviceId])

    const colDef:IColDef[] = [
        {
            header: 'JWT',
            field: 'jwt'
        },
        {
            header: 'IP Address',
            field: 'ipAddress'
        },
        {
            header: 'Description',
            field: '',
            Component: (props:IclientDeviceTokenRow) => {
                return <ShortendDescription value={props.description} />
            }
        },
        {
            header: 'Expiration',
            field: 'expiration'
        },
        {
            header: 'Disabled',
            field: 'disabled',
            Component: (props:IclientDeviceTokenRow) => {
                return <Check value={props.disabled} />
            }
        },
        {
            header: 'Changed',
            field: '',
            Component: (props:IclientDeviceTokenRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: '',
            field: '',
            Component: (props:IclientDeviceTokenRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View Device Token" />
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

export default AccountClientDeviceTokensReadOnlyView