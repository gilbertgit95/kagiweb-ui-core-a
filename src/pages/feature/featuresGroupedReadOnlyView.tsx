import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

import { IColDef } from '../../components/tables/primaryTable';
import TreeDirectory, { objectGenerator, IDir } from '../../components/navs/treeDirectory';
import DateChanges, {IChangeDate} from '../../components/dates/dateChanges';
import ShortendDescription from '../../components/texts/shortendDescription';
import SimpleLink from '../../components/links/simpleLink';
import FilterableTable from '../../components/tables/filterableTable';
import { useAppSelector} from '../../stores/appStore';
import { IFeature } from '../../types/feature';

interface IFeatureRow {
    _id: string,
    name: string,
    value: string,
    scope: string,
    type: string,
    tags: string[]
}

const colDef:IColDef[] = [
    {
        header: 'Name',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            return <ShortendDescription value={props.name} />
        }
    },
    {
        header: 'Value',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            return <ShortendDescription value={props.value} />
        }
    },
    {
        header: 'Scope',
        field: 'scope',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Type',
        field: 'type',
        Component: undefined // react Component or undefined
    },
    {
        header: 'Changed',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            return <DateChanges {...props} />
        }
    },
    {
        header: '',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            return (
                <SimpleLink
                    link={`/features/view/${ props._id }`}
                    text="View Feature" />
            )
        }
    }
]

const FeaturesGroupedReadOnlyView = () => {
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [tagSelection, setTagSelection] = useState<string[]>([])
    const [data, setData] = useState<(IFeatureRow & IChangeDate)[]>([])
    const [directories, setDirectories] = useState<IDir>({name: 'All', subDir: []})

    useEffect(() => {
        const init = async () => {
            const filterTags = (tagSelection.length > 1? tagSelection.slice(1): []).join('')

            if (features) {
                const tarnsformedData:(IFeatureRow & IChangeDate)[] = features
                    .filter(item => {
                        const itemTags = item.tags? item.tags.join(''): ''
                        return itemTags.indexOf(filterTags) === 0
                    })
                    .map((item:IFeature & IChangeDate) => {
                        return {
                            _id: item._id || '',
                            name: item.name || '--',
                            value: item.value || '--',
                            scope: item.scope || '--',
                            type: item.type || '--',
                            tags: item.tags || [],
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt
                        }
                    })
                setData(tarnsformedData)
            }
        }
        console.log('initiate features page')
        init()
    }, [features, tagSelection])

    useEffect(() => {
        const tags = features? features.map(item => item.tags || []): []
        const dir = objectGenerator(tags)
        setDirectories(dir)
    }, [features])

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
                <FilterableTable
                    filterConfig={{
                        searchValue: '',
                        searchField: 'name',
                        filterValue: '',
                        filterField: 'type',
                        filterOptions: [],
                        sortValue: undefined,
                        sortField: 'name',
                        fieldOptions: ['name', 'value', 'scope', 'type']
                    }}
                    tableConfig={{
                        // maxHeight: 700,
                        columnDefs: colDef,
                        data: data
                    }} />
            </Grid>
        </>
    )
}

export default FeaturesGroupedReadOnlyView