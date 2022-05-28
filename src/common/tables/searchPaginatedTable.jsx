import { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'

import DebouncingTextField from '../inputs/debouncingTextField'

const SearchPaginatedTable = (props) => {
    return (
        <>
            <DebouncingTextField
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
            search table
        </>
    )
}

export default SearchPaginatedTable