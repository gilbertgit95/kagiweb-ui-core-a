import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from '@mui/material';
import { IUser, IWorkspace } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import Config from '../../config';

interface IProps {
    user: IUser | undefined
}

interface IWorkspaceRow {
    _id: string,
    name: string,
    description: string,
    userRefs: number,
    isActive: boolean,
    disabled: boolean,
    createdAt: string,
    updatedAt: string
}

const UserWorkspacesReadOnlyView = ({user}:IProps) => {
    const [data, setData] = useState<IWorkspaceRow[]>([])

    useEffect(() => {
        if (user && user.workspaces) {
            const transformedData:IWorkspaceRow[] = user.workspaces.map((item:IWorkspace & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '--',
                    name: item.name,
                    description: item.description || '--',
                    userRefs: item.userRefs?.length || 0,
                    isActive: Boolean(item.isActive),
                    disabled: Boolean(item.disabled),
                    createdAt: moment(item.createdAt).format(Config.defaultDateTimeFormat),
                    updatedAt: moment(item.updatedAt).format(Config.defaultDateTimeFormat)
                }
            })
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [user])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: 'name'
        },
        {
            header: 'Description',
            field: 'description'
        },
        {
            header: 'Users',
            field: 'userRefs'
        },
        {
            header: 'Default Active',
            field: 'isActive',
            Component: (props:IWorkspaceRow) => {
                return <Check value={props.isActive} />
            }
        },
        {
            header: 'Disabled',
            field: 'disabled',
            Component: (props:IWorkspaceRow) => {
                return <Check value={props.disabled} />
            }
        },
        {
            header: 'Updated',
            field: 'updatedAt'
        },
        {
            header: 'Created',
            field: 'createdAt'
        },
        {
            header: '',
            field: 'userRefs',
            Component: (props:IWorkspaceRow) => {
                const navigate = useNavigate()
    
                return (
                    <Button
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`${ props._id }`)}
                        variant="text">View Workspace</Button>
                )
            }
        }
    ]

    return (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    )
}

export default UserWorkspacesReadOnlyView