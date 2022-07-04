import { useState, useEffect } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
// import Paper from '@mui/material/Paper'
import InputAdornment from '@mui/material/InputAdornment'
import TablePagination from '@mui/material/TablePagination'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material'

import DebouncingTextField from '../inputs/debouncingTextField'
import { Typography } from '@mui/material'

const BasicTable = (props) => {
    const [states, setStates] = useState({
        headers: props.headers? props.headers: [],
        rows: props.rows? props.rows: [],
        searchText: '',
        searchField: '__',
        page: 0,
        rowsPerPage: 10
    })
    const theme = useTheme()

    const onSearchText = (value) => {
        setStates({...states, ...{ searchText: value, page: 0, }})
    }

    const handleChangePage = (event, newPage) => {
        setStates({...states, ...{ page: newPage }})
    }
    
    const handleChangeRowsPerPage = (event) => {
        setStates({...states, ...{
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        }})
    }

    const handleSearchFieldChange = (event) => {
        setStates({...states, ...{
            searchField: event.target.value
        }})
    }

    useEffect(() => {
        setStates({...states, ...{
            rows: props.rows? props.rows: [],
            headers: props.headers? props.headers: []
        }})
        console.log(props.rows)
    }, [props.rows, props.headers])

    // filter by search
    let filteredRows = states.rows.filter((row) => {
        let field = states.searchField
        let text = states.searchText.toLowerCase()
        let fieldValue = ''

        // search for all props
        if (field === '__') {
            fieldValue = states.headers.reduce((acc, header) => {
                acc += row[header]? row[header]: ''
                return acc
            }, '')
        } else {
        // search only on a specific field
            fieldValue = row[field]
        }
        fieldValue = fieldValue.toLowerCase()

        return fieldValue.indexOf(text) > -1
    })

    // console.log('filtered rows: ', filteredRows)
    // console.log('props rows: ', props.rows)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
                <DebouncingTextField
                    fullWidth
                    size='small'
                    label='Search in table'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    onChange={ onSearchText } />
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
                <FormControl fullWidth>
                    <InputLabel id='search_field_label' size='small'>Search Field</InputLabel>
                    <Select
                        labelId='search_field_label'
                        id='search_field'
                        label='Search Field'
                        size='small'
                        value={ states.searchField }
                        onChange={ handleSearchFieldChange }>
                        <MenuItem value={'__'}>all fields</MenuItem>
                        {
                            states.headers.map((item,index) => (
                                <MenuItem key={ `searchfield${ item }_${ index }` } value={ item }>{ item }</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid
                sx={{ paddingLeft: { xs: 0 }, textAlign: 'left' }}
                item xs={12} sm={5} md={6}>
                { props.rightSideComponents? props.rightSideComponents: null }
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    states.headers.map((item,index) => (
                                        <TableCell key={ `tableheader${ item }_${ index }` }>{ item }</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            
                            filteredRows
                                // sluice for pagination
                                .slice(
                                    states.page * states.rowsPerPage,
                                    states.page * states.rowsPerPage + states.rowsPerPage
                                )
                                // render rows
                                .map((row, rowIndex) => (
                                    <TableRow
                                        key={'tablerow' + rowIndex}
                                        sx={{
                                            '&:nth-of-type(even)': { backgroundColor: theme.palette.primary.main + '10' },
                                            '&:nth-of-type(odd)': { backgroundColor: theme.palette.primary.main + '30' },
                                            'td': { border: 0 }
                                        }}>
                                        {
                                            states.headers.map((col, colIndex) => (
                                                <TableCell key={ `table data${ col }_${ rowIndex }${ colIndex }` }>
                                                    { row[col] }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* display if table is empty */}
                {
                    filteredRows && filteredRows.length? (
                        <TablePagination
                            component='div'
                            count={filteredRows.length}
                            page={states.page}
                            rowsPerPage={states.rowsPerPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage} />
                    ): (
                        <Box>
                            <Typography
                                style={{ textAlign: 'center', padding: 10 }}
                                variant='body1'>
                                No Content
                            </Typography>
                        </Box>
                    )
                }
            </Grid>
        </Grid>
    )
}

export default BasicTable