import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { IAccount, IWorkspaceAccountRef } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface props {
    account?: IAccount,
    workspaceId?: string,
    accountRefId?: string,
    getFunc: (accountId:string, workspaceId:string, accountRefId: string) => Promise<{data: IWorkspaceAccountRef & {nameId?:string} | null}>
}

const AccountWorkspaceAccountRefReadOnlyView = ({account, workspaceId, accountRefId, getFunc}:props) => {
    const [accountRef, setAccountRef] = useState<IWorkspaceAccountRef & {nameId?:string, createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        const init = async () => {
            if (account && account.contactInfos && workspaceId) {
                const usrRef = await getFunc(account._id || '', workspaceId, accountRefId || '')
                if (usrRef?.data) setAccountRef(usrRef.data)
            }
        }

        init()

    }, [account, workspaceId, accountRefId])

    const colDef:IColDef[] = [
        {
            header: 'Field',
            field: 'field'
        },
        {
            header: 'Value',
            field: 'value'
        }
    ]

    const data:{field: string, value: string|undefined}[] = [
        { field: 'User ID', value: accountRef?.accountId },
        { field: 'NameID', value: accountRef?.nameId || '--' },
        { field: 'Read Access', value: accountRef?.readAccess? 'True': 'False' },
        { field: 'Update Access', value: accountRef?.updateAccess? 'True': 'False' },
        { field: 'Create Access', value: accountRef?.createAccess? 'True': 'False' },
        { field: 'Delete Access', value: accountRef?.deleteAccess? 'True': 'False' },
        { field: 'Accepted', value: accountRef?.accepted? 'True': 'False' },
        { field: 'Declined', value: accountRef?.declined? 'True': 'False' },
        { field: 'Disabled', value: accountRef?.disabled? 'True': 'False' },
        { field: 'Created', value: moment(accountRef?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(accountRef?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) }
    ]

    return accountRef? (
        <Grid item xs={12}>
            <PrimaryTable
                maxHeight={700}
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default AccountWorkspaceAccountRefReadOnlyView