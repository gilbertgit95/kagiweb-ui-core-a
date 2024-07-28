import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
import Grid from '@mui/material/Grid';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { Button } from '@mui/material';
import { IAccount, IWorkspace } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import ShortendDescription from '../../components/texts/shortendDescription';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';

interface IProps {
    account: IAccount | undefined
}

interface IWorkspaceRow {
    _id: string,
    name: string,
    description: string,
    userRefs: number,
    isActive: boolean,
    disabled: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const AccountWorkspacesReadOnlyView = ({account}:IProps) => {
    const [data, setData] = useState<IWorkspaceRow[]>([])

    useEffect(() => {
        if (account && account.workspaces) {
            const transformedData:IWorkspaceRow[] = account.workspaces.map((item:IWorkspace & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '--',
                    name: item.name,
                    description: item.description || '--',
                    userRefs: item.userRefs?.length || 0,
                    isActive: Boolean(item.isActive),
                    disabled: Boolean(item.disabled),
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            })
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [account])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: 'name'
        },
        {
            header: 'Description',
            field: '',
            Component: (props:IWorkspaceRow) => {
                return <ShortendDescription value={props.description} />
            }
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
            header: 'Changed',
            field: '',
            Component: (props:IWorkspaceRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: '',
            field: 'userRefs',
            Component: (props:IWorkspaceRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View Workspace" />
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

export default AccountWorkspacesReadOnlyView