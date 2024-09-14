import React from 'react';
import moment from 'moment';

import Grid from '@mui/material/Grid';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import SecondaryHeader from '../../components/headers/secondaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import SimpleLink from '../../components/links/simpleLink';
import { IAccount } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface IModuleData {module: string, moduleRoute: string, contents: number}
interface props { account?: IAccount & {createdAt?:Date, updatedAt?:Date} }

const AccountReadOnlyView = ({account}:props) => {
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
        { field: 'nameId', value: account?.nameId },
        { field: 'disabled', value: account?.disabled? 'True': 'False' },
        { field: 'verified', value: account?.verified? 'True': 'False' },
        { field: 'Created', value: account?.createdAt? moment(account?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--' },
        { field: 'Updated', value: account?.updatedAt? moment(account?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--' }
    ]

    const modulesData:IModuleData[] = [
        {
            module: 'Account Information',
            moduleRoute: 'accountInfos',
            contents: account?.accountInfos?.length || 0
        },
        {
            module: 'Contact Information',
            moduleRoute: 'contactInfos',
            contents: account?.contactInfos?.length || 0
        },
        {
            module: 'Roles',
            moduleRoute: 'roles',
            contents: account?.rolesRefs?.length || 0
        },
        {
            module: 'Workspaces',
            moduleRoute: 'workspaces',
            contents: account?.workspaces?.length || 0
        },
        {
            module: 'Passwords',
            moduleRoute: 'passwords',
            contents: account?.passwords?.length || 0
        },
        {
            module: 'Client Devices',
            moduleRoute: 'clientDevices',
            contents: account?.clientDevices?.length || 0
        },
        {
            module: 'Limited Transactions',
            moduleRoute: 'limitedTransactions',
            contents: account?.limitedTransactions?.length || 0
        },
        {
            module: 'Account Configurations',
            moduleRoute: 'accountConfigs',
            contents: account?.accountConfigs?.length || 0
        }
    ]

    return account? (
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