import React from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SortIcon from '@mui/icons-material/Sort'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import DebouncingTextField from '../inputs/debouncingTextField'

export interface ITransformationConfig {
    searchValue?: string,
    searchFields?: string[],

    filterValue?: string,
    filterOption?: string[],
    filterFields?: string[],

    sortValue?: 'asc' | 'dsc',
    sortFields?: string[],

    textFieldsOption?: string[],
}

interface IProps {
    config?: ITransformationConfig,
    onChange?: (conf:ITransformationConfig) => void
}

export default function Tablefilters({
    config,
    onChange
}:ITransformationConfig & IProps) {
    const [anchorSearch, setAnchorSearch] = React.useState<HTMLButtonElement | null>(null);
    const [anchorFilter, setAnchorFilter] = React.useState<HTMLButtonElement | null>(null);
    const [anchorSort, setAnchorSort] = React.useState<HTMLButtonElement | null>(null);

    const handleChange = (overwrite:ITransformationConfig) => {
        const configUpdate = {...config, ...overwrite}
        if (onChange) onChange(configUpdate)
    }

    let sortIcon = <HorizontalRuleIcon />
    if (config?.sortValue === 'asc') sortIcon = <KeyboardArrowUpIcon />
    if (config?.sortValue === 'dsc') sortIcon = <KeyboardArrowDownIcon />

    return (
        <>
            <ButtonGroup
                size="small"
                sx={{marginRight: '10px'}}
                variant="outlined">
                <DebouncingTextField
                    size="small"
                    delayedchange={(val) => {
                        handleChange({searchValue: val})
                    }} />
                <Button
                    onClick={(event) => {
                        setAnchorSearch(event.currentTarget);
                    }}>
                    <ManageSearchIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup
                size="small"
                sx={{marginRight: '10px'}}
                variant="outlined">
                <Select
                    size="small"
                    value={config?.filterValue}
                    onChange={(e) => {
                        handleChange({filterValue: e.target.value as string})
                    }}>
                    <MenuItem value={''}>None</MenuItem>
                    {
                        config?.filterOption?.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>{ item }</MenuItem>
                            )
                        })
                    }
                </Select>
                <Button
                    onClick={(event) => {
                        setAnchorFilter(event.currentTarget);
                    }}>
                    <FilterAltIcon />
                </Button>
            </ButtonGroup>
            <ButtonGroup
                size="medium"
                sx={{marginRight: '10px'}}
                variant="outlined">
                <Button
                    onClick={() => {
                        const val = config?.sortValue
                        let newVal: 'asc'|'dsc'|undefined = undefined

                        if (val === 'asc') newVal = 'dsc'
                        if (val === 'dsc') newVal = undefined
                        if (val === undefined) newVal = 'asc'

                        handleChange({sortValue: newVal})
                    }}
                    startIcon={sortIcon}>
                    Sort
                </Button>
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