import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import { IRole } from '../../types/role';
import { IColDef } from '../../components/tables/primaryTable';
import FilterableTable from '../../components/tables/filterableTable';
import { useAppSelector} from '../../stores/appStore';
import ShortendDescription from '../../components/texts/shortendDescription';
import ListItems from '../../components/lists/listItems';
import { IFeature } from '../../types/feature';

interface IProps {
    role?: IRole
}

interface IFeatureRow {
    _id: string,
    name: string,
    value: string,
    type: string,
    tags: string[]
}

const RoleFeaturesListReadOnlyView = ({role}:IProps) => {
    // const roles = useAppSelector(state => state.appRefs.roles)
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [data, setData] = useState<IFeatureRow[]>([])

    useEffect(() => {
        const init = async () => {
            if (role && role.featuresRefs) {
                const featuresMap:{[key: string]:IFeature} = features.reduce((acc:{[key:string]:IFeature}, item:IFeature) => {
                    if (item && item._id) acc[item._id] = item
                    return acc
                }, {})
                const tarnsformedData:IFeatureRow[] = role.featuresRefs.map((item) => {
                    const feature = featuresMap[item.featureId || '']
                    return {
                        _id: feature?._id || '',
                        name: feature?.name || '--',
                        value: feature?.value || '--',
                        type: feature?.type  || '--',
                        tags: feature?.tags || []
                    }
                })
                // console.log(tarnsformedData)
                setData(tarnsformedData)
            }
        }
        console.log('initiate role features page')
        init()
    }, [role, features])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: '',
            Component: (props:IFeatureRow) => {
                return <ShortendDescription maxWidth={250} value={props.name} />
            }
        },
        {
            header: 'Value',
            field: '',
            Component: (props:IFeatureRow) => {
                return <ShortendDescription maxWidth={250} value={props.value} />
            }
        },
        {
            header: 'Type',
            field: 'type',
            Component: undefined // react Component or undefined
        },
        {
            header: 'Tags',
            field: '',
            Component: (props:IFeatureRow) => {
                return <ListItems items={props.tags} />
            }
        }
    ]

    return (
        role?.absoluteAuthority? null:(
            <Grid item xs={12}>
                <FilterableTable
                    filterConfig={{
                        searchValue: '',
                        searchField: 'name',
                        filterValue: '',
                        filterField: 'type',
                        filterOptions: [],
                        sortValue: undefined,
                        sortField: 'name',
                        fieldOptions: ['name', 'value', 'type']
                    }}
                    tableConfig={{
                        // maxHeight: 700,
                        columnDefs: colDef,
                        data: data
                    }} />
            </Grid>
        )
    )
}

export default RoleFeaturesListReadOnlyView