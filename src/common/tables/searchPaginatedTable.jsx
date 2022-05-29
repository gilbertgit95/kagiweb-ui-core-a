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

import DebouncingTextField from '../inputs/debouncingTextField'
import { Typography } from '@mui/material'

const SearchPaginatedTable = (props) => {
    const [states, setStates] = useState({
        headers: [],
        rows: [
            {
                name: '',
                calories: '',
                fat: '',
                carb: '',
                protein: ''
            },
            {
                name: '',
                calories: '',
                fat: '',
                carb: '',
                protein: ''
            }
        ],
        page: 0,
        rowsPerPage: 10
    })

    const handleChangePage = (event, newPage) => {
        setStates({...states, ...{ page: newPage }})
    }
    
    const handleChangeRowsPerPage = (event) => {
        setStates({...states, ...{
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
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
                    onChange={(value) => {
                        console.log(value)
                    }} />
            </Grid>
            <Grid
                sx={{ paddingLeft: { xs: 0 } }}
                item xs={12} sm={8} md={9}>
                {
                    props.rightSideComponents? props.rightSideComponents: null
                }
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dessert (100g serving)</TableCell>
                                <TableCell>Calories</TableCell>
                                <TableCell>Fat&nbsp;(g)</TableCell>
                                <TableCell>Carbs&nbsp;(g)</TableCell>
                                <TableCell>Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            states.rows.map((row, index) => (
                                <TableRow
                                    key={row.name + index}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.calories}</TableCell>
                                    <TableCell>{row.fat}</TableCell>
                                    <TableCell>{row.carbs}</TableCell>
                                    <TableCell>{row.protein}</TableCell>
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