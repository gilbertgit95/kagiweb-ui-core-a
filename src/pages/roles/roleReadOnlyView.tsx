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
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/roles/view/${ role?._id }/${ props.moduleRoute }`)}
                        variant="text">View { props.module }</Button>
                )
            }
        }
    ]

    const data:{field: string, value: string|undefined}[] = [
        { field: 'name', value: role?.name },
        { field: 'description', value: role?.description },
        { field: 'level', value: String(role?.level) },
        { field: 'reqLimitPerSec', value: String(role?.reqLimitPerSec) }
    ]

    const modulesData:{module: string, moduleRoute: string, contents: number}[] = [
        { module: 'Features', moduleRoute: 'features', contents: 0 }
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