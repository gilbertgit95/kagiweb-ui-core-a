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
    const [tableData, setTableData] = useState<IPrimaryTableProps>()
    const [transformedTableData, setTransformedTableData] = useState([])

    // only executes if there are changes in the input table filter
    // and executes if there are changes in the input table config
    useEffect(() => {
        setTableFilter({...tablefilter, ...filterConfig})
    }, [filterConfig])

    // executes if local filter configurations and table data has updates
    useEffect(() => {
        // data transformation will be executed here
        let transformed = []
        // filter by filter value
        // filter by search text
        // if sort is enable sort by sort field
        setTransformedTableData([])
    }, [tablefilter, tableConfig])

    return (
        <>
            <Grid item xs={12}>
                <Tablefilters
                    onChange={(filterConf) => {
                        setTableFilter(filterConf)
                    }}
                    config={tablefilter} />
            </Grid>
            <Grid item xs={12}>
                <PrimaryTable {...tableConfig} />
            </Grid>
        </>
    )
}

export default FilterableTable