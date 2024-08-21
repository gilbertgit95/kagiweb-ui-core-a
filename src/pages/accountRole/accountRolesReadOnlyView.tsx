import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { IRole } from '../../types/role';
import { IAccount, IRoleRef } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import { useAppSelector} from '../../stores/appStore';

interface IProps {
    account: IAccount | undefined
}

interface IRoleRow {
    _id: string,
    name: string,
    description: string,
    level: number,
    absoluteAuthority: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const AccountRolesReadOnlyView = ({account}:IProps) => {
    const roles = useAppSelector(state => state.appRefs.roles) || []
    const [data, setData] = useState<IRoleRow[]>([])

    useEffect(() => {
        if (account && account.rolesRefs) {
            const rolesMap:{[key: string]:IRole} = roles.reduce((acc:{[key:string]:IRole}, item:IRole) => {
                if (item && item._id) acc[item._id] = item
                return acc
            }, {})
            const tarnsformedData:IRoleRow[] = account.rolesRefs.map((item:IRoleRef & {createdAt?: Date, updatedAt?: Date}) => {
                const role = rolesMap[item.roleId || '']
                return {
                    _id: item._id || '',
                    name: role? role.name: '(None Existing Role)',
                    description: role? (role?.description || ''): 'This might have been deleted.',
                    level: role? role.level: -1,
                    absoluteAuthority: role? Boolean(role.absoluteAuthority): false,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            })
            // console.log(tarnsformedData)
            setData(tarnsformedData)
        }
            
    }, [account, roles])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: 'name',
            Component: undefined
        },
        {
            header: 'Description',
            field: 'description',
            Component: undefined
        },
        {
            header: 'Level',
            field: 'level',
            Component: undefined
        },
        {
            header: 'Absolute Authority',
            field: 'absoluteAuthority',
            Component: (props:IRoleRow) => {
                return <Check value={props.absoluteAuthority} />
            }
        },
        {
            header: 'Changed',
            field: '',
            Component: (props:IRoleRow) => {
                return <DateChanges {...props} />
            }
        }
    ]

    return (
        <Grid item xs={12}>
            <PrimaryTable
                maxHeight={700}
                columnDefs={colDef}
                data={data} />
        </Grid>
    )
}

export default AccountRolesReadOnlyView