import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import { IAccount, IClientDevice } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import SecondaryHeader from '../../components/headers/secondaryHeader';
import SimpleLink from '../../components/links/simpleLink';
import AccountClientDeviceService from './accountClientDeviceService';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface IProps {
    account?: IAccount
    clientDeviceId?: string
}

interface IClientDeviceInfoRow {
    label: string,
    value: string
}
interface IClientDeviceSubModuleData {module: string, moduleRoute: string, contents: number}

const AccountClientDeviceReadOnlyView = ({account, clientDeviceId}:IProps) => {
    // const navigate = useNavigate()
    const [clientDevice, setClientDevice] = useState<IClientDevice & {createdAt?:Date, updatedAt?:Date} | undefined>(undefined)

    useEffect(() => {
        if (account && account.clientDevices && clientDeviceId) {
            const cd = AccountClientDeviceService.getClientDeviceById(account, clientDeviceId)
            setClientDevice(cd)
        }

    }, [account, clientDeviceId])

    const data:IClientDeviceInfoRow[] = [
        {
            label: 'account Agent',
            value: clientDevice?.ua || '--'
        },
        {
            label: 'Description',
            value: clientDevice?.description || '--'
        },
        {
            label: 'Disabled',
            value: Boolean(clientDevice?.disabled)? 'True': 'False'
        },
        {   
            label: 'Created',
            value: moment(clientDevice?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat)
        },
        {   
            label: 'Updated',
            value: moment(clientDevice?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat)
        }
    ]

    const modulesData:IClientDeviceSubModuleData[] = [
        {
            module: 'Access Tokens',
            moduleRoute: 'clientDeviceTokens',
            contents: clientDevice?.accessTokens?.length || 0
        }
    ]

    const colDef:IColDef[] = [
        {
            header: 'Field',
            field: 'label'
        },
        {
            header: 'Value',
            field: 'value'
        }
    ]

    const moduleColDef:IColDef[] = [
        {
            header: 'Module',
            field: 'module'
        },
        {
            header: 'Contents',
            field: 'contents'
        },
        {
            header: 'View',
            field: 'moduleRoute',
            Component: (rowProps) => {
                return (
                    <SimpleLink
                        link={`${ rowProps.moduleRoute }`}
                        text={`View ${ rowProps.module }`} />
                )
            }
        }
    ]

    return (
        <>
            <Grid item xs={12}>
                <PrimaryTable
                    columnDefs={colDef}
                    data={data} />
            </Grid>
            <Grid item xs={12}>
                <SecondaryHeader Icon={SnippetFolderIcon} title={'Sub Modules'} />
                {/* <Divider /> */}
            </Grid>
            <Grid item xs={12}>
                <PrimaryTable
                    columnDefs={moduleColDef}
                    data={modulesData} />
            </Grid>
        </>
    )
}

export default AccountClientDeviceReadOnlyView