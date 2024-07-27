import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import UserWorkspaceUserRefService from './userWorkspaceUserRefService';
import { IAccount, IWorkspaceAccountRef } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface props {
    account?: IAccount,
    workspaceId?: string,
    userRefId?: string,
    getFunc: (accountId:string, workspaceId:string, userRefId: string) => Promise<{data: IWorkspaceAccountRef & {username?:string} | null}>
}

const UserWorkspaceUserRefReadOnlyView = ({account, workspaceId, userRefId, getFunc}:props) => {
    const [userRef, setAccountRef] = useState<IWorkspaceAccountRef & {username?:string, createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        const init = async () => {
            if (account && account.contactInfos && workspaceId) {
                const usrRef = await getFunc(account._id || '', workspaceId, userRefId || '')
                if (usrRef?.data) setAccountRef(usrRef.data)
            }
        }

        init()

    }, [account, workspaceId, userRefId])

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
        { field: 'User ID', value: userRef?.accountId },
        { field: 'Username', value: userRef?.username || '--' },
        { field: 'Read Access', value: userRef?.readAccess? 'True': 'False' },
        { field: 'Update Access', value: userRef?.updateAccess? 'True': 'False' },
        { field: 'Create Access', value: userRef?.createAccess? 'True': 'False' },
        { field: 'Delete Access', value: userRef?.deleteAccess? 'True': 'False' },
        { field: 'Accepted', value: userRef?.accepted? 'True': 'False' },
        { field: 'Declined', value: userRef?.declined? 'True': 'False' },
        { field: 'Disabled', value: userRef?.disabled? 'True': 'False' },
        { field: 'Created', value: moment(userRef?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(userRef?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) }
    ]

    return userRef? (
        <Grid item xs={12}>
            <PrimaryTable
                maxHeight={700}
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default UserWorkspaceUserRefReadOnlyView