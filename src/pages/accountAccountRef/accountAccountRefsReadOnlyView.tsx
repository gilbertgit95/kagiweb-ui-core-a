import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { IAccount, IWorkspaceAccountRef } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';

interface IProps {
    account: IAccount | undefined,
    workspaceId: string | undefined,
    getFunc: (accountId:string, workspaceId:string) => Promise<{data: (IWorkspaceAccountRef & {nameId?:string})[]}>
}

interface IWorkspaceAccountRefRow {
    _id: string,
    accountId: string,
    nameId: string,
    accepted: boolean,
    declined: boolean,
    disabled: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const AccountWorkspaceAccountRefsReadOnlyView = ({account, workspaceId, getFunc}:IProps) => {
    // const navigate = useNavigate()
    const [data, setData] = useState<IWorkspaceAccountRefRow[]>([])

    useEffect(() => {
        const init = async () => {
            if (account && account.workspaces && workspaceId) {
                const accountRefs = await getFunc(account._id || '', workspaceId)
                const transformedData:IWorkspaceAccountRefRow[] = accountRefs?.data.map((item:IWorkspaceAccountRef & {nameId?:string, createdAt?: Date, updatedAt?: Date}) => {
                    return {
                        _id: item._id || '',
                        accountId: item.accountId,
                        nameId: item.nameId || '--',
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

    }, [account, workspaceId, getFunc])

    const colDef:IColDef[] = [
        {
            header: 'NameID',
            field: 'nameId'
        },
        {
            header: 'Accepted',
            field: 'accepted',
            Component: (props:IWorkspaceAccountRefRow) => {
                return <Check value={props.accepted} />
            }
        },
        {
            header: 'Declined',
            field: 'declined',
            Component: (props:IWorkspaceAccountRefRow) => {
                return <Check value={props.declined} />
            }
        },
        {
            header: 'Changed',
            field: '_id',
            Component: (props:IWorkspaceAccountRefRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: 'Disabled',
            field: 'disabled',
            Component: (props:IWorkspaceAccountRefRow) => {
                return <Check value={props.disabled} />
            }
        },
        {
            header: '',
            field: '_id',
            Component: (props:IWorkspaceAccountRefRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View Account Ref" />
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

export default AccountWorkspaceAccountRefsReadOnlyView