import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import { Button } from '@mui/material';
import { IUser, IClientDevice } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import SecondaryHeader from '../../components/headers/secondaryHeader';
// import Check from '../../components/indicators/check';
// import Config from '../../config';
import UserClientDeviceService from './userClientDeviceService';

interface IProps {
    user?: IUser
    clientDeviceId?: string
}

interface IClientDeviceInfoRow {
    label: string,
    value: string
}
interface IClientDeviceSubModuleData {module: string, moduleRoute: string, contents: number}

const UserClientDeviceReadOnlyView = ({user, clientDeviceId}:IProps) => {
    const navigate = useNavigate()
    const [clientDevice, setClientDevice] = useState<IClientDevice | undefined>(undefined)

    useEffect(() => {
        if (user && user.clientDevices && clientDeviceId) {
            const cd = UserClientDeviceService.getClientDeviceById(user, clientDeviceId)
            setClientDevice(cd)
        }

    }, [user, clientDeviceId])

    const data:IClientDeviceInfoRow[] = [
        {
            label: 'User Agent',
            value: clientDevice?.ua || '--'
        },
        {
            label: 'Description',
            value: clientDevice?.description || '--'
        },
        {
            label: 'Disabled',
            value: Boolean(clientDevice?.disabled)? 'True': 'False'
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
                    <Button
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(rowProps.moduleRoute)}
                        variant="text">View { rowProps.module }</Button>
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

export default UserClientDeviceReadOnlyView