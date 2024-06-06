import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import Tablefilters, { ITransformationConfig } from './tableFilters'
import PrimaryTable, { IPrimaryTableProps } from './primaryTable'

interface IProps {
    filterConfig?: ITransformationConfig,
    tableConfig: IPrimaryTableProps
}

/**
 * input default filter configuration, table data and col definations,
 * then process table data output base on the filter configurations,
 * the output of data filtering will be used in the table
 * 
 * table should not have pagination, table should only contain all the data
 * tobe displayed.
 * 
 * @param param0 
 * @returns 
 */
const FilterableTable = ({filterConfig, tableConfig}:IProps) => {
    const [tablefilter, setTableFilter] = useState<ITransformationConfig>({
        searchValue: '',
        searchField: '',
        filterValue: '',
        filterField: '',
        filterOptions: [],
        sortValue: undefined,
        sortField: '',
        fieldOptions: [],
    })

    const [filterOptions, setFilterOptions] = useState<string[]>([])
    const [transformedTableData, setTransformedTableData] = useState<any[]>([])

    // this will be executer if the input table filter config and
    // input table config changes
    // this will set the local state for table filter
    useEffect(() => {
        setTableFilter({...tablefilter, ...filterConfig})
        setFilterOptions(filterConfig?.filterOptions || [])
        setTransformedTableData(tableConfig.data || [])
    }, [filterConfig, tableConfig.data])

    // this will be executed if the local table filter
    // and the input table config change
    useEffect(() => {
        // data transformation will be executed here
        let transformed = []
        // filter by filter value
        // filter by search text
        // if sort is enable sort by sort field
        // setTransformedTableData([])
    }, [tablefilter.filterField, tableConfig.data])

    return (
        <>
            <Grid item xs={12}>
                <Tablefilters
                    onChange={(filterConf) => {
                        setTableFilter(filterConf)
                    }}
                    config={{
                        ...tablefilter,
                        ...{filterOptions}
                    }} />
            </Grid>
            <Grid item xs={12}>
                <PrimaryTable {...{...tableConfig, ...{data: transformedTableData}}} />
            </Grid>
        </>
    )
}

export default FilterableTable