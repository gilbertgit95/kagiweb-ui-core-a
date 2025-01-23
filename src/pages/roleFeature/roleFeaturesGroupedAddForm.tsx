import React, { useEffect, useState, useMemo } from 'react';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

import { IRole } from '../../types/role';
import { IColDef } from '../../components/tables/primaryTable';
import FilterableTable from '../../components/tables/filterableTable';
import { useAppSelector} from '../../stores/appStore';
import { IFeature } from '../../types/feature';
import ShortendDescription from '../../components/texts/shortendDescription';
import TreeDirectory, { objectGenerator, IDir } from '../../components/navs/treeDirectory';
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
    const [filteredData, setFilteredData] = useState<IFeatureRow[]>([])
    const [directories, setDirectories] = useState<IDir>({name: 'All', subDir: []})
    const [tagSelection, setTagSelection] = useState<string[]>([])

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
        if (role?.featuresRefs && features) {
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

            const tags = tarnsformedData? tarnsformedData.map(item => item.tags || []): []
            const dir = objectGenerator(tags)

            setDirectories(dir)
            setData(tarnsformedData)
        }
    }, [role, features])

    useEffect(() => {
        const filterTags = (tagSelection.length > 1? tagSelection.slice(1): []).join('')
        const filteredList = data
            // .filter(item => item.scope === role?.scope)
            .filter(item => scopeAccess[role?.scope || '']?.has(item.scope || ''))
            .filter(item => {
                const itemTags = item.tags? item.tags.join(''): ''
                return itemTags.indexOf(filterTags) === 0
            })
        setFilteredData(filteredList)
    }, [role, data, tagSelection])

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
                return <ShortendDescription maxWidth={200} value={props.value} />
            }
        },
        {
            header: 'Type',
            field: 'type',
            Component: undefined // react Component or undefined
        }
    ]

    return (
        <Container style={{paddingTop: 20}}>
            <Grid container spacing={2}>
                {
                    role?.absoluteAuthority? null:(
                        <>
                            <Grid item xs={12} md={5} lg={4} xl={3}>
                                <TreeDirectory
                                    enableSearch
                                    onSelect={(selection) => {
                                        setTagSelection(selection)
                                        if (onSelect) onSelect([])
                                    }}
                                    selected={tagSelection}
                                    directory={directories} />
                            </Grid>
                            <Grid item xs={12} md={7} lg={8} xl={9}>
                                {/* <PrimaryTable
                                    maxHeight={700}
                                    enableSelection
                                    enableMultipleSelection
                                    onSelect={(data) => {if (onSelect) onSelect(data)}}
                                    columnDefs={colDef}
                                    data={filteredData} /> */}
                                <FilterableTable
                                    filterConfig={filterConfig}
                                    tableConfig={{
                                        maxHeight: 400,
                                        enableSelection: true,
                                        enableMultipleSelection: true,
                                        onSelect: (data) => {if (onSelect) onSelect(data)},
                                        columnDefs: colDef,
                                        data: filteredData
                                    }} />
                            </Grid>
                        </>
                    )
                }
            </Grid>
        </Container>
    )
}

export default RoleFeaturesAddForm