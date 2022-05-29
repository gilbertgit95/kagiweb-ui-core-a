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
import Paper from '@mui/material/Paper'
import InputAdornment from '@mui/material/InputAdornment'
import TablePagination from '@mui/material/TablePagination'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import DebouncingTextField from '../inputs/debouncingTextField'
import { Typography } from '@mui/material'

const SearchPaginatedTable = (props) => {
    const [states, setStates] = useState({
        headers: ['name', 'calories', 'fat', 'carb', 'protein'],
        rows: [
            { name: 'test0001', calories: 'cal0001', fat: 'fat0001', carb: 'carb0001', protein: 'pro0001' },
            { name: 'test0002', calories: 'cal0002', fat: 'fat0002', carb: 'carb0002', protein: 'pro0002' },
            { name: 'test0003', calories: 'cal0003', fat: 'fat0003', carb: 'carb0003', protein: 'pro0003' },
            { name: 'test0004', calories: 'cal0004', fat: 'fat0004', carb: 'carb0004', protein: 'pro0004' },
            { name: 'test0005', calories: 'cal0005', fat: 'fat0005', carb: 'carb0005', protein: 'pro0005' },
            { name: 'test0006', calories: 'cal0006', fat: 'fat0006', carb: 'carb0006', protein: 'pro0006' },
        ],
        filteredRows: [],
        searchText: '',
        searchField: '__',
        page: 0,
        rowsPerPage: 10
    })

    const onSearchText = (value) => {
        setStates({...states, ...{ searchText: value }})
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
                sx={{ paddingLeft: { xs: 0 } }}
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
                            states.rows.map((row, rowIndex) => (
                                <TableRow
                                    key={'tablerow' + rowIndex}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: 'rgba(128, 128, 128, 0.2)' },
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
                    states.rows && states.rows.length? (
                        <TablePagination
                            component='div'
                            count={100}
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

export default SearchPaginatedTable