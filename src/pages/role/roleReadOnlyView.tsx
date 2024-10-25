import React from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';

import SecondaryHeader from '../../components/headers/secondaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import SimpleLink from '../../components/links/simpleLink';
import { IRole } from '../../types/role';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface Props {
    role: IRole & {createdAt?:Date, updatedAt?:Date} | undefined
}

const RoleReadOnlyView = ({role}:Props) => {
    const colDef:IColDef[] = [
        {
            header: 'Field',
            field: 'field',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Value',
            field: 'value',
            Component: undefined // react Component or undefined
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
            Component: (props) => {
                return <SimpleLink
                            disabled={props.disabledLink}
                            link={`/roles/view/${ role?._id }/${ props.moduleRoute }`}
                            text={`View ${ props.module }`} />
            }
        }
    ]

    const data:{field: string, value: string|undefined}[] = [
        { field: 'Name', value: role?.name },
        { field: 'Scope', value: role?.scope },
        { field: 'Description', value: role?.description },
        { field: 'Level', value: String(role?.level) },
        { field: 'Absolute Authority', value: role?.absoluteAuthority? 'True': 'False' },
        { field: 'Request Limit/Second', value: String(role?.reqLimitPerSec) },
        { field: 'Created', value: role?.createdAt? moment(role?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--' },
        { field: 'Updated', value: role?.updatedAt? moment(role?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--' }
    ]

    const modulesData:{module: string, moduleRoute: string, contents: string, disabledLink: boolean}[] = [
        {
            module: 'Features',
            moduleRoute: 'features',
            disabledLink: Boolean(role?.absoluteAuthority),
            contents: String((role?.absoluteAuthority)? 'Everything':(role?.featuresRefs?.length || 0))
        }
    ]

    return role? (
        <>
            <Grid item xs={12}>
                <PrimaryTable
                    columnDefs={colDef}
                    data={data} />
            </Grid>
                <Grid item xs={12}>
                <SecondaryHeader Icon={SnippetFolderIcon} title={'Role Sub Modules'} />
            </Grid>
            <Grid item xs={12}>
                <PrimaryTable
                    columnDefs={moduleColDef}
                    data={modulesData} />
            </Grid>
        </>
    ): null
}

export default RoleReadOnlyView