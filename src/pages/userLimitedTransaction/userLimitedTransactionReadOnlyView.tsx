import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import UserLimitedTransactionService from './userLimitedTransactionService';
import { IUser, IContactInfo } from '../../types/user';
import Config from '../../config';

interface props {
    user?: IUser,
    limitedTransactionId?: string
}

const UserLimitedTransactionReadOnlyView = ({user, limitedTransactionId}:props) => {
    const [ContactInfo, setContactInfo] = useState<IContactInfo & {createdAt?:Date, updatedAt?:Date} | undefined>()

    useEffect(() => {
        // if (user && user.contactInfos && limitedTransactionId) {
        //     const contact = UserLimitedTransactionService.getLimitedTransactionById(user, limitedTransactionId)
        //     setContactInfo(contact)
        // }

    }, [user, limitedTransactionId])

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