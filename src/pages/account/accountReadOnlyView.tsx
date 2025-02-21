import React from 'react';
import moment from 'moment';

import Grid from '@mui/material/Grid';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import SecondaryHeader from '../../components/headers/secondaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import SimpleLink from '../../components/links/simpleLink';
import { IAccount } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'
import { useAppSelector} from '../../stores/appStore';

interface IModuleData {module: string, moduleRoute: string, isOwner?: boolean}
interface ISubModuleData {module: string, moduleRoute: string, contents: number}
interface props { account?: IAccount & {createdAt?:Date, updatedAt?:Date} }

const AccountReadOnlyView = ({account}:props) => {
    // const navigate = useNavigate()
    const accountData = useAppSelector(state => state.signedInAccount.accountData)

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

    const subModulesColDef:IColDef[] = [
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

    const modulesColDef:IColDef[] = [
        {
            header: 'Module',
            field: 'module'
        },
        {
            header: 'View',
            field: 'moduleRoute',
            Component: (rowProps) => {
                let link = rowProps.moduleRoute

                if (rowProps.isOwner) {
                    link = '/owner/view/notifications'
                }

                return (
                    <SimpleLink
                        text={`View ${ rowProps.module }`}
                        link={link} />
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

    const subModulesData:ISubModuleData[] = [
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
            module: 'Account Reference',
            moduleRoute: 'accountRefs',
            contents: account?.accountRefs?.length || 0
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
            module: 'Configurations',
            moduleRoute: 'accountConfigs',
            contents: account?.accountConfigs?.length || 0
        }
    ]

    const modulesData:IModuleData[] = [
        {
            module: 'Account Notifications',
            moduleRoute: 'notifications',
            isOwner: accountData?._id === account?._id
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
                    columnDefs={subModulesColDef}
                    data={subModulesData} />
            </Grid>
            <Grid item xs={12}>
                <SecondaryHeader Icon={SnippetFolderIcon} title={'Modules'} />
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