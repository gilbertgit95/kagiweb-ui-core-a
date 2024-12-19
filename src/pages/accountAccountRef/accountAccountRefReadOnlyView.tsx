import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import SecondaryHeader from '../../components/headers/secondaryHeader';
import SimpleLink from '../../components/links/simpleLink';
import { IAccount, IWorkspaceAccountRef } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface props {
    account?: IAccount,
    workspaceId?: string,
    accountRefId?: string,
    getFunc: (accountId:string, workspaceId:string, accountRefId: string) => Promise<{data: IWorkspaceAccountRef & {nameId?:string} | null}>
}

interface IModuleData {module: string, moduleRoute: string, contents: number}


const AccountWorkspaceAccountRefReadOnlyView = ({account, workspaceId, accountRefId, getFunc}:props) => {
    const [accountRef, setAccountRef] = useState<IWorkspaceAccountRef & {nameId?: string, createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        const init = async () => {
            if (account && workspaceId && accountRefId) {
                const usrRef = await getFunc(account._id || '', workspaceId, accountRefId || '')
                if (usrRef?.data) setAccountRef(usrRef.data)
            }
        }

        init()

    }, [account, workspaceId, accountRefId])

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
        { field: 'User ID', value: accountRef?.accountId },
        { field: 'NameID', value: accountRef?.nameId || '--' },
        { field: 'Accepted', value: accountRef?.accepted? 'True': 'False' },
        { field: 'Declined', value: accountRef?.declined? 'True': 'False' },
        { field: 'Disabled', value: accountRef?.disabled? 'True': 'False' },
        { field: 'Created', value: moment(accountRef?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(accountRef?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) }
    ]

    const modulesData:IModuleData[] = [
        {
            module: 'Roles',
            moduleRoute: 'roles',
            contents: accountRef?.rolesRefs?.length || 0
        },
        {
            module: 'Configurations',
            moduleRoute: 'accountConfigs',
            contents: accountRef?.accountConfigs?.length || 0
        }
    ]


    return accountRef? (
        <>
            <Grid item xs={12}>
                <PrimaryTable
                    maxHeight={700}
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

export default AccountWorkspaceAccountRefReadOnlyView