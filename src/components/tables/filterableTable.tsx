import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Grid, Box, Typography } from '@mui/material'
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

    useEffect(() => {
        setTableFilter({...tablefilter, ...filterConfig})
        setFilterOptions(filterConfig?.filterOptions || [])
        setTransformedTableData(tableConfig.data || [])
    }, [filterConfig, tableConfig.data])

    // table filter setting
    useEffect(() => {
        let filterOpts:string[] = []
        let filterField:string = ''
        filterField = tablefilter?.filterField || ''

        // assign filter options if the parameters exists
        if (filterField && tableConfig.data) {
            filterOpts = tableConfig.data.map(item => {
                return item[filterField] as string
            }) || []
        }
        // get unique values
        filterOpts = Array.from(new Set(filterOpts)).sort()

        setFilterOptions(filterOpts)

    }, [tablefilter.filterField, tableConfig.data])

    // actual data filtering
    useEffect(() => {
        let transformedData = tableConfig.data || []

        // check search filtering
        if (tablefilter.searchValue && tablefilter.searchField) {
            const searchVal = tablefilter.searchValue.toLowerCase()
            transformedData = transformedData.filter(item => {
                const itemVal = item[tablefilter.searchField!].toLowerCase()
                return itemVal.indexOf(searchVal) > -1
            })
        }

        // check value filtering
        if (tablefilter.filterValue && tablefilter.filterField) {
            transformedData = transformedData.filter(item => {
                return tablefilter.filterValue === item[tablefilter.filterField!]
            })
        }

        // check sort
        if (tablefilter.sortValue && tablefilter.sortField) {
            const sortVal = tablefilter.sortValue
            const sortField = tablefilter.sortField

            // default to ascending
            transformedData = _.sortBy(transformedData, sortField)

            // for descending sort
            if (sortVal === 'dsc') {
                transformedData = transformedData.reverse()
            }
        }

        setTransformedTableData(transformedData)

        // console.log('table filter changes!', tablefilter)
    }, [tablefilter, tableConfig.data])

    return (
        <>
            <Grid item xs={12}>
                <Box sx={{paddingBottom: '10px'}}>
                    <Tablefilters
                        onChange={(filterConf) => {
                            setTableFilter(filterConf)
                        }}
                        config={{
                            ...tablefilter,
                            ...{filterOptions}
                        }}
                        customSection={
                            <Typography
                                sx={{marginLeft: '10px'}}
                                component="span"
                                color="primary"
                                variant="subtitle1">
                                { transformedTableData.length }
                            </Typography>
                        } />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <PrimaryTable {...{...tableConfig, ...{data: transformedTableData}}} />
            </Grid>
        </>
    )
}

export default FilterableTable