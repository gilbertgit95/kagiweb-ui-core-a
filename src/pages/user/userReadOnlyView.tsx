import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button} from '@mui/material';

import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import SecondaryHeader from '../../components/headers/secondaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { IUser } from '../../types/user';

interface IModuleData {module: string, moduleRoute: string, contents: number}
interface props { user?: IUser }

const UserReadOnlyView = ({user}:props) => {
    const navigate = useNavigate()

    const colDef:IColDef[] = [
        {
            header: 'Field',
            field: 'field'
        },
        {
            header: 'Value',
            field: 'value'
        }
    ]

    const modulesColDef:IColDef[] = [
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

    const data:{field: string, value: string|undefined}[] = [
        { field: 'username', value: user?.username },
        { field: 'disabled', value: user?.disabled? 'True': 'False' },
        { field: 'verified', value: user?.verified? 'True': 'False' }
    ]

    const modulesData:IModuleData[] = [
        {
            module: 'User Information',
            moduleRoute: 'userInfos',
            contents: user?.userInfos?.length || 0
        },
        {
            module: 'Contact Information',
            moduleRoute: 'contactInfos',
            contents: user?.contactInfos?.length || 0
        },
        {
            module: 'Roles',
            moduleRoute: 'roles',
            contents: user?.rolesRefs?.length || 0
        },
        {
            module: 'Limitedtransactions',
            moduleRoute: 'limitedTransactions',
            contents: user?.limitedTransactions?.length || 0
        },
        {
            module: 'Client Devices',
            moduleRoute: 'clientDevices',
            contents: user?.clientDevices?.length || 0
        },
        {
            module: 'Workspaces',
            moduleRoute: 'workspaces',
            contents: user?.workspaces?.length || 0
        },
        {
            module: 'Passwords',
            moduleRoute: 'passwords',
            contents: user?.passwords?.length || 0
        },
    ]

    return user? (
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
                    maxHeight={700}
                    columnDefs={modulesColDef}
                    data={modulesData} />
            </Grid>
        </>
    ): null
}

export default UserReadOnlyView