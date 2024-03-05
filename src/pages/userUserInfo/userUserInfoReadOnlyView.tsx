import React from 'react';

import Grid from '@mui/material/Grid';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { IUser } from '../../types/user';

interface props { user?: IUser }

const UserUserInfoReadOnlyView = ({user}:props) => {

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
        { field: 'username', value: user?.username },
        { field: 'disabled', value: user?.disabled? 'True': 'False' },
        { field: 'verified', value: user?.verified? 'True': 'False' }
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