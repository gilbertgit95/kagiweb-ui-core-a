import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { IAccount, IAccountConfig } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';
import AccountWorkspaceAccountRefService from '../accountWorkspaceAccountRef/accountWorkspaceAccountRefService';

interface IProps {
    account: IAccount | undefined,
    workspaceId: string,
    accountRefId: string
}

interface IAccountConfigRow {
    _id: string,
    key: string,
    value: string,
    type: string,
    createdAt?: Date,
    updatedAt?: Date
}

const AccountWorkspaceAccountRefAccountConfigsReadOnlyView = ({account, workspaceId, accountRefId}:IProps) => {
    // const navigate = useNavigate()
    const [data, setData] = useState<IAccountConfigRow[]>([])

    useEffect(() => {
        const accountRoleRefs = account? AccountWorkspaceAccountRefService.getWorkspaceAccountRefById(account, workspaceId, accountRefId): null
        if (accountRoleRefs && accountRoleRefs.accountConfigs) {
            const transformedData:IAccountConfigRow[] = accountRoleRefs.accountConfigs.map((item:IAccountConfig & {createdAt?: Date, updatedAt?: Date}) => {
                return {
                    _id: item._id || '',
                    key: item.key || '--',
                    value: item.value || '--',
                    type: item.type || '--',
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
            })
            // console.log(transformedData)
            setData(transformedData)
        }

    }, [account, workspaceId, accountRefId])

    const colDef:IColDef[] = [
        {
            header: 'Key',
            field: 'key'
        },
        {
            header: 'Value',
            field: 'value'
        },
        {
            header: 'Type',
            field: 'type',
        },
        {
            header: 'Changed',
            field: '_id',
            Component: (props:IAccountConfigRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: '',
            field: '_id',
            Component: (props:IAccountConfigRow) => {
                return (
                    <SimpleLink
                        link={`${ props._id }`}
                        text="View Account Config" />
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

export default AccountWorkspaceAccountRefAccountConfigsReadOnlyView