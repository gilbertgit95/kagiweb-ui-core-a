import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import UserWorkspaceUserRefService from './userWorkspaceUserRefService';
import { IUser, IWorkspaceUserRef } from '../../types/user';
import Config from '../../config';

interface props {
    user?: IUser,
    workspaceId?: string,
    userRefId?: string
}

const UserWorkspaceUserRefReadOnlyView = ({user, workspaceId, userRefId}:props) => {
    const [userRef, setUserRef] = useState<IWorkspaceUserRef & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (user && user.contactInfos && workspaceId) {
            const usrRef = UserWorkspaceUserRefService.getWorkspaceUserRefById(user, workspaceId, userRefId || '')
            setUserRef(usrRef)
        }

    }, [user, workspaceId, userRefId])

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
        { field: 'User ID', value: userRef?.userId },
        { field: 'Username', value: userRef?.username },
        { field: 'Read Access', value: userRef?.readAccess? 'True': 'False' },
        { field: 'Update Access', value: userRef?.updateAccess? 'True': 'False' },
        { field: 'Create Access', value: userRef?.createAccess? 'True': 'False' },
        { field: 'Delete Access', value: userRef?.deleteAccess? 'True': 'False' },
        { field: 'Accepted', value: userRef?.accepted? 'True': 'False' },
        { field: 'Declined', value: userRef?.declined? 'True': 'False' },
        { field: 'Disabled', value: userRef?.disabled? 'True': 'False' },
        { field: 'Created', value: moment(userRef?.createdAt).format(Config.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(userRef?.updatedAt).format(Config.defaultDateTimeFormat) }
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