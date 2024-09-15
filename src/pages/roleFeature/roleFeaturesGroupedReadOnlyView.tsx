import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import { IRole } from '../../types/role';
import { IColDef } from '../../components/tables/primaryTable';
import FilterableTable from '../../components/tables/filterableTable';
import { useAppSelector} from '../../stores/appStore';
import ShortendDescription from '../../components/texts/shortendDescription';
import TreeDirectory, { objectGenerator, IDir } from '../../components/navs/treeDirectory';
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

const RoleFeaturesGroupedReadOnlyView = ({role}:IProps) => {
    // const roles = useAppSelector(state => state.appRefs.roles)
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [tagSelection, setTagSelection] = useState<string[]>([])
    const [data, setData] = useState<IFeatureRow[]>([])
    const [directories, setDirectories] = useState<IDir>({name: 'All', subDir: []})

    useEffect(() => {
        const init = async () => {
            if (role) {
                const filterTags = (tagSelection.length > 1? tagSelection.slice(1): []).join('')

                if (role && role.featuresRefs) {
                    const featuresMap:{[key: string]:IFeature} = features.reduce((acc:{[key:string]:IFeature}, item:IFeature) => {
                        if (item && item._id) acc[item._id] = item
                        return acc
                    }, {})
                    const tarnsformedData:IFeatureRow[] = role.featuresRefs
                        .filter(item => {
                            const feature = featuresMap[item.featureId || '']
                            const itemTags = feature?.tags? feature?.tags?.join(''): ''
                            return itemTags.indexOf(filterTags) === 0
                        })
                        .map((item) => {
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
        }
        console.log('initiate role features page')
        init()
    }, [role, features, tagSelection])

    useEffect(() => {
        if (role) {
            if (role && role.featuresRefs) {
                const featuresMap:{[key: string]:IFeature} = features.reduce((acc:{[key:string]:IFeature}, item:IFeature) => {
                    if (item && item._id) acc[item._id] = item
                    return acc
                }, {})
                const tarnsformedData:IFeatureRow[] = role.featuresRefs
                    .map((item) => {
                        const feature = featuresMap[item.featureId || '']
                        return {
                            _id: feature?._id || '',
                            name: feature?.name || '--',
                            value: feature?.value || '--',
                            type: feature?.type  || '--',
                            tags: feature?.tags || []
                        }
                    })
                const tags = tarnsformedData? tarnsformedData.map(item => item.tags || []): []
                const dir = objectGenerator(tags)
                setDirectories(dir)
            }
        }
    }, [data])

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
        }
    ]

    return (
        <>
            <Grid item xs={12} md={3}>
                <TreeDirectory
                    enableSearch
                    onSelect={(selection) => {
                        setTagSelection(selection)
                    }}
                    selected={tagSelection}
                    directory={directories} />
            </Grid>
            <Grid item xs={12} md={9}>
                {
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
                }
            </Grid>
        </>
    )
}

export default RoleFeaturesGroupedReadOnlyView