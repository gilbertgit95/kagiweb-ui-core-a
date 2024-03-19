import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import UserContactInfoService from './userContactInfoService';
import { IUser, IContactInfo } from '../../types/user';
import Config from '../../config';

interface props {
    user?: IUser,
    contactInfoId?: string
}

const UserLimitedTransactionReadOnlyView = ({user, contactInfoId}:props) => {
    const [ContactInfo, setContactInfo] = useState<IContactInfo & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        if (user && user.contactInfos && contactInfoId) {
            const contact = UserContactInfoService.getContactInfoById(user, contactInfoId)
            setContactInfo(contact)
        }

    }, [user, contactInfoId])

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
        { field: 'Type', value: ContactInfo?.type },
        { field: 'Value', value: ContactInfo?.value },
        { field: 'Verified', value: ContactInfo?.verified? 'True': 'False' },
        { field: 'Created', value: moment(ContactInfo?.createdAt).format(Config.defaultDateTimeFormat) },
        { field: 'Updated', value: moment(ContactInfo?.updatedAt).format(Config.defaultDateTimeFormat) }
    ]

    return ContactInfo? (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default UserLimitedTransactionReadOnlyView