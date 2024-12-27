import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { IAccount, IAccountAccountRef } from '../../types/account';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import Check from '../../components/indicators/check';
import DateChanges from '../../components/dates/dateChanges';
import SimpleLink from '../../components/links/simpleLink';

interface IProps {
    account: IAccount | undefined,
    getFunc: (accountId:string) => Promise<{data: (IAccountAccountRef & {nameId?:string})[]}>
}

interface IAccountAccountRefRow {
    _id: string,
    accountId: string,
    nameId: string,
    accepted: boolean,
    declined: boolean,
    disabled: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

const AccountAccountRefsReadOnlyView = ({account, getFunc}:IProps) => {
    // const navigate = useNavigate()
    const [data, setData] = useState<IAccountAccountRefRow[]>([])

    useEffect(() => {
        const init = async () => {
            if (account && account.accountRefs) {
                const accountRefs = await getFunc(account._id || '')
                const transformedData:IAccountAccountRefRow[] = accountRefs?.data.map((item:IAccountAccountRef & {nameId?:string, createdAt?: Date, updatedAt?: Date}) => {
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

    }, [account, getFunc])

    const colDef:IColDef[] = [
        {
            header: 'NameID',
            field: 'nameId'
        },
        {
            header: 'Accepted',
            field: 'accepted',
            Component: (props:IAccountAccountRefRow) => {
                return <Check value={props.accepted} />
            }
        },
        {
            header: 'Declined',
            field: 'declined',
            Component: (props:IAccountAccountRefRow) => {
                return <Check value={props.declined} />
            }
        },
        {
            header: 'Changed',
            field: '_id',
            Component: (props:IAccountAccountRefRow) => {
                return <DateChanges {...props} />
            }
        },
        {
            header: 'Disabled',
            field: 'disabled',
            Component: (props:IAccountAccountRefRow) => {
                return <Check value={props.disabled} />
            }
        },
        {
            header: '',
            field: '_id',
            Component: (props:IAccountAccountRefRow) => {
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

export default AccountAccountRefsReadOnlyView