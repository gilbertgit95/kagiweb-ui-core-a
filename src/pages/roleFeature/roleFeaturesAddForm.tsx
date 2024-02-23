import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import { IRole } from '../../types/role';
import PrimaryTable, { IColDef } from '../../components/tables/primaryTable';
import { useAppSelector} from '../../stores/appStore';
import { IFeature } from '../../types/feature';

interface IProp {
    role:IRole|undefined,
    onSelect?: (selected:string[]) => void,
}

interface IFeatureRow {
    _id: string,
    name: string,
    value: string,
    type: string,
    tags: string
}

const RoleFeaturesAddForm = ({role, onSelect}:IProp) => {
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [data, setData] = useState<IFeatureRow[]>([])

    useEffect(() => {
        if (role?.featuresRefs) {
            const featuresMap:{[key: string]:IFeature} = features.reduce((acc:{[key:string]:IFeature}, item:IFeature) => {
                if (item && item._id) acc[item._id] = item
                return acc
            }, {})
            const tarnsformedData:IFeatureRow[] = role.featuresRefs.map((item) => {
                const feature = featuresMap[item.featureId || '']
                return {
                    _id: item._id || '',
                    name: feature.name || '--',
                    value: feature.value || '--',
                    type: feature.type  || '--',
                    tags: feature.tags?.join(', ')  || '--'
                }
            })
            setData(tarnsformedData)
        }
    }, [role, features])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: 'name',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Value',
            field: 'value',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Type',
            field: 'type',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Tags',
            field: 'tags',
            Component: undefined // react Component or undefined
        }
    ]

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                {
                    role?.absoluteAuthority? null:(
                        <Grid item xs={12}>
                            <PrimaryTable
                                enableSelection
                                enableMultipleSelection
                                onSelect={(data) => {if (onSelect) onSelect(data)}}
                                columnDefs={colDef}
                                data={data} />
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}

export default RoleFeaturesAddForm