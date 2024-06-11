import React from 'react'
import Popover from '@mui/material/Popover'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SortIcon from '@mui/icons-material/Sort'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import DebouncingTextField from '../inputs/debouncingTextField'

export interface ITransformationConfig {
    searchValue?: string,
    searchField?: string,

    filterValue?: string,
    filterField?: string,
    filterOptions?: string[],

    sortValue?: 'asc' | 'dsc',
    sortField?: string,

    fieldOptions?: string[],
}

interface IProps {
    config?: ITransformationConfig,
    onChange?: (conf:ITransformationConfig) => void,
    customSection?: React.ReactNode
}

export default function Tablefilters({
    config,
    onChange,
    customSection
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
                        config?.filterOptions?.map((item, index) => {
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
                sx={{marginRight: '10px', position: 'relative', top: '5px'}}
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
            {/* display */}
            { customSection? customSection: null }
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
                <Box sx={{padding: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                    <FormControl>
                        <Typography variant="subtitle1" color="primary">Searchable Fields</Typography>
                        <RadioGroup
                            value={config?.searchField}
                            onChange={(e) => {
                                handleChange({searchField: e.target.value})
                            }}>
                            {
                                config?.fieldOptions?.map((item, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={item}
                                        control={<Radio />}
                                        label={item} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </Box>
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
                <Box sx={{padding: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                    <FormControl>
                        <Typography variant="subtitle1" color="primary">Filterable Fields</Typography>
                        <RadioGroup
                            value={config?.filterField}
                            onChange={(e) => {
                                handleChange({
                                    filterField: e.target.value,
                                    filterValue: undefined
                                })
                            }}>
                            {
                                config?.fieldOptions?.map((item, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={item}
                                        control={<Radio />}
                                        label={item} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </Box>
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
                <Box sx={{padding: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                    <FormControl>
                        <Typography variant="subtitle1" color="primary">Sortable Fields</Typography>
                        <RadioGroup
                            value={config?.sortField}
                            onChange={(e) => {
                                handleChange({sortField: e.target.value})
                            }}>
                            {
                                config?.fieldOptions?.map((item, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={item}
                                        control={<Radio />}
                                        label={item} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Popover>
        </>
    )
}