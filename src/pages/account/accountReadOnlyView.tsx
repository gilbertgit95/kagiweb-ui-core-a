import React from 'react';
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import { Button} from '@mui/material';

import Grid from '@mui/material/Grid';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import SecondaryHeader from '../../components/headers/secondaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import SimpleLink from '../../components/links/simpleLink';
import { IAccount } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface IModuleData {module: string, moduleRoute: string, contents: number}
interface props { user?: IAccount & {createdAt?:Date, updatedAt?:Date} }

const AccountReadOnlyView = ({user}:props) => {
    // const navigate = useNavigate()

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
                    <SimpleLink
                        text={`View ${ rowProps.module }`}
                        link={rowProps.moduleRoute} />
                )
            }
        }
    ]

    const data:{field: string, value: string|undefined}[] = [
        { field: 'username', value: user?.username },
        { field: 'disabled', value: user?.disabled? 'True': 'False' },
        { field: 'verified', value: user?.verified? 'True': 'False' },
        { field: 'Created', value: user?.createdAt? moment(user?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--' },
        { field: 'Updated', value: user?.updatedAt? moment(user?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--' }
    ]

    const modulesData:IModuleData[] = [
        {
            module: 'Account Information',
            moduleRoute: 'accountInfos',
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
            module: 'Limited Transactions',
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

export default AccountReadOnlyView