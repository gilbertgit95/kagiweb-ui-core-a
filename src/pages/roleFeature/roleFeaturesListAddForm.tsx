import React, { useEffect, useState, useMemo } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import { IRole } from '../../types/role';
import { IColDef } from '../../components/tables/primaryTable';
import FilterableTable from '../../components/tables/filterableTable';
import { useAppSelector} from '../../stores/appStore';
import { IFeature } from '../../types/feature';
import ShortendDescription from '../../components/texts/shortendDescription';
import ListItems from '../../components/lists/listItems';
import { scopeAccess } from '../../utils/appConstants';

interface IProp {
    role:IRole|undefined,
    onSelect?: (selected:string[]) => void,
}

interface IFeatureRow {
    _id: string,
    name: string,
    scope: string,
    value: string,
    type: string,
    tags: string[]
}

const RoleFeaturesAddForm = ({role, onSelect}:IProp) => {
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [data, setData] = useState<IFeatureRow[]>([])

    const filterConfig = useMemo(() => ({
        searchValue: '',
        searchField: 'name',
        filterValue: '',
        filterField: 'type',
        filterOptions: [],
        sortValue: undefined,
        sortField: 'name',
        fieldOptions: ['name', 'value', 'type']
    }), [])

    useEffect(() => {
        if (role?.featuresRefs) {

            const roleFeatures:Set<string> = new Set(role.featuresRefs.map(item => item.featureId))
            const tarnsformedData:IFeatureRow[] = features
                .filter(item => !roleFeatures.has(item._id || ''))
                // .filter(item => item.scope === role.scope)
                .filter(item => scopeAccess[role.scope || '']?.has(item.scope || ''))
                .map((item) => {
                    return {
                        _id: item._id || '',
                        name: item.name || '--',
                        scope: item.scope || '--',
                        value: item.value || '--',
                        type: item.type || '--',
                        tags: item.tags || []
                    }
                })
            setData(tarnsformedData)
        }
    }, [role, features])

    const colDef:IColDef[] = [
        {
            header: 'Name',
            field: '',
            Component: (props:IFeatureRow) => {
                return <ShortendDescription maxWidth={100} value={props.name} />
            }
        },
        {
            header: 'Value',
            field: '',
            Component: (props:IFeatureRow) => {
                return <ShortendDescription maxWidth={100} value={props.value} />
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
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                {
                    role?.absoluteAuthority? null:(
                        <Grid item xs={12}>
                            {/* <PrimaryTable
                                enableSelection
                                enableMultipleSelection
                                onSelect={(data) => {if (onSelect) onSelect(data)}}
                                columnDefs={colDef}
                                data={data} /> */}
                            <FilterableTable
                                filterConfig={filterConfig}
                                tableConfig={{
                                    maxHeight: 400,
                                    enableSelection: true,
                                    enableMultipleSelection: true,
                                    onSelect: (data) => {if (onSelect) onSelect(data)},
                                    columnDefs: colDef,
                                    data: data
                                }} />
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}

export default RoleFeaturesAddForm