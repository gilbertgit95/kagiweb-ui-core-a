import { useState, useEffect } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'

import DebouncingTextField from '../inputs/debouncingTextField'

const SearchPaginatedTable = (props) => {
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
                search table
            </Grid>
        </Grid>
    )
}

export default SearchPaginatedTable