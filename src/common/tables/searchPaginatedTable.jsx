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

import DebouncingTextField from '../inputs/debouncingTextField'

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
        ]
    })

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
                <TableContainer component={Paper}>
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
                                    key={row.name + index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
            </Grid>
        </Grid>
    )
}

export default SearchPaginatedTable