import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button} from '@mui/material';

import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import SecondaryHeader from '../../components/headers/secondaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { IUser } from '../../types/user';

interface IUserSettingsData {field: string, fieldRoute: string, contents: number}
interface IUserSubModuleData {module: string, moduleRoute: string, contents: number}
interface props { user?: IUser }

const UserReadOnlyView = ({user}:props) => {
    const navigate = useNavigate()

    const colDef:IColDef[] = [
        {
            header: 'Field',
            field: 'field',
            Component: undefined
        },
        {
            header: 'Value',
            field: 'value',
            Component: undefined
        }
    ]

    const settingsColDef:IColDef[] = [
        {
            header: 'Field',
            field: 'field',
            Component: undefined
        },
        {
            header: 'Contents',
            field: 'contents',
            Component: undefined
        },
        {
            header: 'View',
            field: 'moduleRoute',
            Component: (rowProps) => {
                return (
                    <Button
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(rowProps.fieldRoute)}
                        variant="text">View { rowProps.field }</Button>
                )
            }
        }
    ]

    const moduleColDef:IColDef[] = [
        {
            header: 'Module',
            field: 'module',
            Component: undefined
        },
        {
            header: 'Contents',
            field: 'contents',
            Component: undefined
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

    const data:{field: string, value: string|undefined}[] = [
        { field: 'username', value: user?.username },
        { field: 'disabled', value: user?.disabled? 'True': 'False' },
        { field: 'verified', value: user?.verified? 'True': 'False' }
    ]

    const settingsData:IUserSettingsData[] = [
        {
            field: 'User Information',
            fieldRoute: 'userInfos',
            contents: user?.userInfos?.length || 0
        },
        {
            field: 'Contact Information',
            fieldRoute: 'contactInfos',
            contents: user?.contactInfos?.length || 0
        },
        {
            field: 'Roles',
            fieldRoute: 'roles',
            contents: user?.rolesRefs?.length || 0
        },
        {
            field: 'Limitedtransactions',
            fieldRoute: 'limitedTransactions',
            contents: user?.limitedTransactions?.length || 0
        },
        {
            field: 'Client Devices',
            fieldRoute: 'clientDevices',
            contents: user?.clientDevices?.length || 0
        },
        {
            field: 'Passwords',
            fieldRoute: 'passwords',
            contents: user?.passwords?.length || 0
        },
    ]

    const modulesData:IUserSubModuleData[] = [
        {
            module: 'Workspaces',
            moduleRoute: 'workspaces',
            contents: 0
        }
    ] 

    return user? (
        <>
            <Grid item xs={12}>
                <PrimaryTable
                    columnDefs={colDef}
                    data={data} />
            </Grid>
            <Grid item xs={12}>
                <SecondaryHeader Icon={SettingsIcon} title={'Advance Settings'} />
                {/* <Divider /> */}
            </Grid>
            <Grid item xs={12}>
                <PrimaryTable
                    columnDefs={settingsColDef}
                    data={settingsData} />
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
    ): null
}

export default UserReadOnlyView