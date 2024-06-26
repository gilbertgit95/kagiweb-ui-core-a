import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// import { Button } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { IUser, IWorkspaceUserRef } from '../../types/user';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';
// import UserWorkspaceUserRefService from '../userWorkspaceUserRef/userWorkspaceUserRefService';
// import UserWorkspaceService from '../userWorkspace/userWorkspaceService';

interface IProps {
    user: IUser | undefined,
    workspaceId: string | undefined,
    getFunc: (userId:string, workspaceId:string) => Promise<{data: (IWorkspaceUserRef & {username?:string})[]}>
}

interface IWorkspaceUserRefRow {
    _id: string,
    userId: string,
    username: string,
    readAccess: boolean,
    createAccess: boolean,
    updateAccess: boolean,
    deleteAccess: boolean,
    accepted: boolean,
    declined: boolean,
    disabled: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const UserWorkspaceUserRefsReadOnlyView = ({user, workspaceId, getFunc}:IProps) => {
    // const navigate = useNavigate()
    const [data, setData] = useState<IWorkspaceUserRefRow[]>([])

    useEffect(() => {
        const init = async () => {
            if (user && user.workspaces && workspaceId) {
                const userRefs = await getFunc(user._id || '', workspaceId)
                const transformedData:IWorkspaceUserRefRow[] = userRefs?.data.map((item:IWorkspaceUserRef & {username?:string, createdAt?: Date, updatedAt?: Date}) => {
                    return {
                        _id: item._id || '',
                        userId: item.userId,
                        username: item.username || '--',
                        readAccess: Boolean(item.readAccess),
                        createAccess: Boolean(item.createAccess),
                        updateAccess: Boolean(item.updateAccess),
                        deleteAccess: Boolean(item.deleteAccess),
                        accepted: Boolean(item.accepted),
                        declined: Boolean(item.declined),
                        disabled: Boolean(item.disabled),
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
                    }
                }) || []
                // console.log(transformedData)
                setData(transformedData)
            }
        }

        init()

    }, [user, workspaceId, getFunc])

    const colDef:IColDef[] = [
        {
            header: 'Username',
            field: 'username'
        },
        {
            header: 'Read',
            field: 'readAccess',
            Component: (props:IWorkspaceUserRefRow) => {
                return <Check value={props.readAccess} />
            }
        },
        {
            header: 'Update',
            field: 'updateAccess',
            Component: (props:IWorkspaceUserRefRow) => {
                return <Check value={props.updateAccess} />
            }
        },
        {
            header: 'Create',
            field: 'createAccess',
            Component: (props:IWorkspaceUserRefRow) => {
                return <Check value={props.createAccess} />
            }
        },
        {
            header: 'Delete',
            field: 'deleteAccess',
            Component: (props:IWorkspaceUserRefRow) => {
                return <Check value={props.deleteAccess} />
            }
        },
        {
            header: 'Accepted',
            field: 'accepted',
            Component: (props:IWorkspaceUserRefRow) => {
                return <Check value={props.accepted} />
            }
        },
        {
            header: 'Declined',
            field: 'declined',
            Component: (props:IWorkspaceUserRefRow) => {
                return <Check value={props.declined} />
            }
        },
        {
            header: 'Changed',
            field: '_id',
            Component: (props:IWorkspaceUserRefRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: 'Disabled',
            field: 'disabled',
            Component: (props:IWorkspaceUserRefRow) => {
                return <Check value={props.disabled} />
            }
        },
        {
            header: '',
            field: '_id',
            Component: (props:IWorkspaceUserRefRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View User Ref" />
                )
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

export default UserWorkspaceUserRefsReadOnlyView