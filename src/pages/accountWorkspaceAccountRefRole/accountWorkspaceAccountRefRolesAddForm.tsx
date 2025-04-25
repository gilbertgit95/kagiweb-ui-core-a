import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import { IRole } from '../../types/role';
import { IAccount } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
// import Check from '../../components/indicators/check';
import ShortendDescription from '../../components/texts/shortendDescription';
import { useAppSelector} from '../../stores/appStore';

interface IProp {
    account: IAccount|undefined,
    workspaceId: string,
    accountRefId: string,
    onSelect?: (selected:string[]) => void,
}

interface IRoleRow {
    _id: string,
    name: string,
    description: string,
    level: number
}

const AccountWorkspaceAccountRefRolesAddForm = ({account, onSelect}:IProp) => {
    const roles:IRole[] = useAppSelector(state => state.appRefs.roles) || []
    const [data, setData] = useState<IRoleRow[]>([])

    useEffect(() => {
        if (account?.rolesRefs) {
            const userRoles:Set<string> = new Set(account?.rolesRefs.map(item => item.roleId))
            const tarnsformedData:IRoleRow[] = roles
                .filter(item => !userRoles.has(item._id || '') && item.scope === 'workspace')
                .map((item) => {
                    return {
                        _id: item._id || '',
                        name: item? item.name: '(None Existing Role)',
                        description: item? (item?.description || ''): 'This might have been deleted.',
                        level: item? item.level: -1
                    }
                })
            setData(tarnsformedData)
        }
    }, [account, roles])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: 'name',
        },
        {
            header: 'Description',
            field: '',
            Component: (props:IRoleRow) => {
                return <ShortendDescription value={props.description} />
            }
        },
        {
            header: 'Level',
            field: 'level',
        }
    ]

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PrimaryTable
                        enableSelection
                        enableMultipleSelection
                        onSelect={(data) => {if (onSelect) onSelect(data)}}
                        columnDefs={colDef}
                        data={data} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default AccountWorkspaceAccountRefRolesAddForm