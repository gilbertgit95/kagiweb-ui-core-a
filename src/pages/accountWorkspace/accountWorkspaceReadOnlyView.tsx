import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import { Button } from '@mui/material';
import { IAccount, IWorkspace } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import SecondaryHeader from '../../components/headers/secondaryHeader';
import AccountWorkspaceService from './accountWorkspaceService';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface IProps {
    account?: IAccount
    workspaceId?: string
}

interface IWorkspaceInfoRow {
    label: string,
    value: string
}
interface IWorkspaceSubModuleData {module: string, moduleRoute: string, contents: number}

const AccountWorkspaceReadOnlyView = ({account, workspaceId}:IProps) => {
    const navigate = useNavigate()
    const [workspace, setWorkspace] = useState<IWorkspace & {createdAt?: Date, updatedAt?: Date} | undefined>(undefined)

    useEffect(() => {
        if (account && account.workspaces && workspaceId) {
            const cd = AccountWorkspaceService.getWorkspaceById(account, workspaceId)
            setWorkspace(cd)
        }

    }, [account, workspaceId])

    const data:IWorkspaceInfoRow[] = [
        {
            label: 'Name',
            value: workspace?.name || '--'
        },
        {
            label: 'Description',
            value: workspace?.description || '--'
        },
        {
            label: 'Disabled',
            value: Boolean(workspace?.disabled)? 'True': 'False'
        },
        {
            label: 'Updated',
            value: workspace?.updatedAt? moment(workspace.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--'
        },
        {
            label: 'Created',
            value: workspace?.createdAt? moment(workspace.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--'
        }
    ]

    const modulesData:IWorkspaceSubModuleData[] = [
        {
            module: 'Account Refs',
            moduleRoute: 'accountRefs',
            contents: workspace?.accountRefs?.length || 0
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

export default AccountWorkspaceReadOnlyView