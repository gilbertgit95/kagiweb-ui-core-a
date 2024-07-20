import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import UserUserInfoService from './userUserInfoService';
import { IAccount, IAccountInfo } from '../../types/account';
import appComponentsHandler from '../../utils/appComponentsHandler'

interface props {
    user?: IAccount,
    accountInfoId?: string
}

const UserUserInfoReadOnlyView = ({user, accountInfoId}:props) => {
    const [userInfo, setUserInfo] = useState<IAccountInfo & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (user && user.userInfos && accountInfoId) {
            const usrInf = UserUserInfoService.getUserInfoById(user, accountInfoId)
            setUserInfo(usrInf)
        }

    }, [user, accountInfoId])

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
        { field: 'Key', value: userInfo?.key },
        { field: 'Value', value: userInfo?.value },
        { field: 'Type', value: userInfo?.type },
        { field: 'Created', value: moment(userInfo?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(userInfo?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat) }
    ]

    return userInfo? (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default UserUserInfoReadOnlyView