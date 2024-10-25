import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'

import { IColDef } from '../../components/tables/primaryTable'
import FilterableTable from '../../components/tables/filterableTable'
// import { ITransformationConfig } from '../../components/tables/tableFilters'
import DateChanges, {IChangeDate} from '../../components/dates/dateChanges'
import ListItems from '../../components/lists/listItems'
import ShortendDescription from '../../components/texts/shortendDescription'
import SimpleLink from '../../components/links/simpleLink'
import { useAppSelector} from '../../stores/appStore'
import { IFeature } from '../../types/feature'

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
        header: 'Tags',
        field: '',
        Component: (props:IFeatureRow & IChangeDate) => {
            return <ListItems items={props.tags} />
        }
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

const FeaturesListReadOnlyView = () => {
    // const navigate = useNavigate()
    const features:IFeature[] = useAppSelector(state => state.appRefs.features) || []
    const [data, setData] = useState<(IFeatureRow & IChangeDate)[]>([])
    // const [filterConfig, setFilterConfig] = useState<ITransformationConfig>({
    //     searchValue: '',
    //     searchField: 'field2',
    
    //     filterValue: '',
    //     filterField: 'field1',
    //     filterOptions: ['value 1', 'value2', 'item3', 'item4'],
    
    //     sortValue: undefined,
    //     sortField: 'field1',

    //     fieldOptions: ['field1', 'field2', 'field3', 'field4']
    // })

    useEffect(() => {
        const init = async () => {
            try {
                if (features) {
                    const tarnsformedData:(IFeatureRow & IChangeDate)[] = features.map((item:IFeature & IChangeDate) => {
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
            } catch (err) {
            }
        }
        console.log('initiate features page')
        init()
    }, [features])


    return (
        <Grid item xs={12}>
            {/* <Tablefilters
                config={filterConfig}
                onChange={(confUpdate) => {
                    console.log(confUpdate)
                    setFilterConfig(confUpdate)
                }} />

            <PrimaryTable
                maxHeight={700}
                columnDefs={colDef}
                data={data} /> */}

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
    )
}

export default FeaturesListReadOnlyView