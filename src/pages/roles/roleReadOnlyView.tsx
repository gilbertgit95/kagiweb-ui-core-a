import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';

import SecondaryHeader from '../../components/headers/secondaryHeader';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { IRole } from '../../types/role';

interface Props {
    role: IRole | undefined
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
                const navigate = useNavigate()
                return (
                    <Button
                        disabled={props.disabledLink}
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/roles/view/${ role?._id }/${ props.moduleRoute }`)}
                        variant="text">View { props.module }</Button>
                )
            }
        }
    ]

    const data:{field: string, value: string|undefined}[] = [
        { field: 'Name', value: role?.name },
        { field: 'Description', value: role?.description },
        { field: 'Level', value: String(role?.level) },
        { field: 'Absolute Authority', value: role?.absoluteAuthority? 'True': 'False' },
        { field: 'Request Limit/Second', value: String(role?.reqLimitPerSec) }
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