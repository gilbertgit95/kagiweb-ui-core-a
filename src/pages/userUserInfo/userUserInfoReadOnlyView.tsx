import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import UserUserInfoService from './userUserInfoService';
import { IUser, IUserInfo } from '../../types/user';
import Config from '../../config';

interface props {
    user?: IUser,
    userInfoId?: string
}

const UserUserInfoReadOnlyView = ({user, userInfoId}:props) => {
    const [userInfo, setUserInfo] = useState<IUserInfo & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (user && user.userInfos && userInfoId) {
            const usrInf = UserUserInfoService.getUserInfoById(user, userInfoId)
            setUserInfo(usrInf)
        }

    }, [user, userInfoId])

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
        { field: 'Created', value: moment(userInfo?.createdAt).format(Config.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(userInfo?.updatedAt).format(Config.defaultDateTimeFormat) }
    ]

    return user? (
        <>
            <Grid item xs={12}>
                <PrimaryTable
                    columnDefs={colDef}
                    data={data} />
            </Grid>
        </>
    ): null
}

export default UserUserInfoReadOnlyView