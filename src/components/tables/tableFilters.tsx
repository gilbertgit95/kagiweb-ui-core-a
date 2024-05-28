import React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SortIcon from '@mui/icons-material/Sort'
import DebouncingTextField from '../inputs/debouncingTextField'

interface ITransformationConfig {
    searchValue?: string,
    searchFields?: string[],
    searchFieldsOption?: string[],

    filterValue?: boolean,
    filterFields?: string[],
    filterFieldsOption?: string[],

    sortValue?: 'asc' | 'dsc',
    sortFields?: string[],
    sortFieldsOption?: string[],
}

interface IProps {
    onChange?: (filteredData:ITransformationConfig) => void
}

export default function Tablefilters({
    searchValue,
    searchFields,
    searchFieldsOption,

    filterValue,
    filterFields,
    filterFieldsOption,

    sortValue,
    sortFields,
    sortFieldsOption,

    onChange
}:ITransformationConfig & IProps) {
    const [anchorSearch, setAnchorSearch] = React.useState<HTMLButtonElement | null>(null);
    const [anchorFilter, setAnchorFilter] = React.useState<HTMLButtonElement | null>(null);
    const [anchorSort, setAnchorSort] = React.useState<HTMLButtonElement | null>(null);

    return (
        <>
            <ButtonGroup
                sx={{marginRight: '10px'}}
                variant="outlined">
                <DebouncingTextField
                    size="small"
                    delayedchange={(val) => {
                        console.log(val)
                    }} />
                <Button
                    onClick={(event) => {
                        setAnchorSearch(event.currentTarget);
                    }}>
                    <ManageSearchIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup
                sx={{marginRight: '10px'}}
                variant="outlined">
                <Select
                    size="small"
                    value={10}
                    onChange={() => {

                    }}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <Button
                    onClick={(event) => {
                        setAnchorFilter(event.currentTarget);
                    }}>
                    <FilterAltIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup
                sx={{marginRight: '10px'}}
                variant="outlined">
                <Button>Sort</Button>
                <Button
                    onClick={(event) => {
                        setAnchorSort(event.currentTarget);
                    }}>
                    <SortIcon />
                </Button>
            </ButtonGroup>
            {/* search settings */}
            <Popover
                open={Boolean(anchorSearch)}
                anchorEl={anchorSearch}
                onClose={() => {
                    setAnchorSearch(null);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Typography sx={{ p: 2 }}>The content of the Search.</Typography>
            </Popover>
            {/* filter settings */}
            <Popover
                open={Boolean(anchorFilter)}
                anchorEl={anchorFilter}
                onClose={() => {
                    setAnchorFilter(null);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Typography sx={{ p: 2 }}>The content of the Filter.</Typography>
            </Popover>
            {/* sort settings */}
            <Popover
                open={Boolean(anchorSort)}
                anchorEl={anchorSort}
                onClose={() => {
                    setAnchorSort(null);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Typography sx={{ p: 2 }}>The content of the Sort.</Typography>
            </Popover>
        </>
    )
}