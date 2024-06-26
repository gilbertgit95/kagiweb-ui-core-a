import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { IRole } from '../../types/role';
import { IUser, IRoleRef } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import { useAppSelector} from '../../stores/appStore';

interface IProps {
    user: IUser | undefined
}

interface IRoleRow {
    _id: string,
    name: string,
    description: string,
    level: number,
    absoluteAuthority: boolean,
    isActive: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const UserRolesReadOnlyView = ({user}:IProps) => {
    const roles = useAppSelector(state => state.appRefs.roles) || []
    const [data, setData] = useState<IRoleRow[]>([])

    useEffect(() => {
        if (user && user.rolesRefs) {
            const rolesMap:{[key: string]:IRole} = roles.reduce((acc:{[key:string]:IRole}, item:IRole) => {
                if (item && item._id) acc[item._id] = item
                return acc
            }, {})
            const tarnsformedData:IRoleRow[] = user.rolesRefs.map((item:IRoleRef & {createdAt?: Date, updatedAt?: Date}) => {
                const role = rolesMap[item.roleId || '']
                return {
                    _id: item._id || '',
                    name: role? role.name: '(None Existing Role)',
                    description: role? (role?.description || ''): 'This might have been deleted.',
                    level: role? role.level: -1,
                    absoluteAuthority: role? Boolean(role.absoluteAuthority): false,
                    isActive: Boolean(item?.isActive),
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            })
            // console.log(tarnsformedData)
            setData(tarnsformedData)
        }
            
    }, [user, roles])

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
            header: 'Active',
            field: 'isActive',
            Component: (props:IRoleRow) => {
                return <Check value={props.isActive} />
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

export default UserRolesReadOnlyView