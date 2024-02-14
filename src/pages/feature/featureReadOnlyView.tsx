import React from 'react';
import Grid from '@mui/material/Grid';

import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { IFeature } from '../../types/feature';

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
    feature: IFeature | undefined
}

const FeatureReadOnlyView = ({feature}: Props) => {
    const data:{field: string, value: string|undefined}[] = [
        { field: 'name', value: feature?.name },
        { field: 'description', value: feature?.description },
        { field: 'type', value: feature?.type },
        { field: 'value', value: feature?.value },
        { field: 'tags', value: feature?.tags?.join(', ') }
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