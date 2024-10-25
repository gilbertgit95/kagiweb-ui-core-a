import React from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';

import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { IFeature } from '../../types/feature';
import appComponentsHandler from '../../utils/appComponentsHandler'

const colDef:IColDef[] = [
    {
        header: 'Field',
        field: 'field',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Value',
        field: 'value',
        Component: undefined // react Component or undefined
    }
]

interface Props {
    feature: IFeature & {createdAt?:Date, updatedAt?:Date} | undefined
}

const FeatureReadOnlyView = ({feature}: Props) => {
    const data:{field: string, value: string|undefined}[] = [
        { field: 'name', value: feature?.name },
        { field: 'description', value: feature?.description },
        { field: 'scope', value: feature?.scope },
        { field: 'type', value: feature?.type },
        { field: 'value', value: feature?.value },
        { field: 'tags', value: feature?.tags?.join(', ') },
        { field: 'Created', value: feature?.createdAt? moment(feature?.createdAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--' },
        { field: 'Updated', value: feature?.updatedAt? moment(feature?.updatedAt).format(appComponentsHandler.appConfig.defaultDateTimeFormat): '--' }
    ]

    return feature? (
        <Grid item xs={12}>
            <PrimaryTable
                columnDefs={colDef}
                data={data} />
        </Grid>
    ): null
}

export default FeatureReadOnlyView