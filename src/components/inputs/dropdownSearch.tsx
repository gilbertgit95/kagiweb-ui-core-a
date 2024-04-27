import React, { useState, useEffect } from 'react'
import { Divider, TextField, Box, Typography, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputAdornment from '@mui/material/InputAdornment';

interface IOption {
    key: string,
    label: string,
    subLabel?: string,
    Icon?: React.FC
}

interface IProps {
    // minWidth?: number,
    selected?: string,
    options: IOption[],
    ariaLabel: string,
    ariaControls: string,
    placeholder?: string,
    onSelect?: (selected:string) => void
}

const DropDownSearch = (props: IProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined)
    const [search, setSearch] = useState<string>('')
    const [filteredOptions, setFilteredOptions] = useState<IOption[]>([])

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setSearch('')
    }

    const handleSelect = (selected:string) => {
        if (props.onSelect) props.onSelect(selected)
        handleClose()
    }

    useEffect(() => {
        for (let sel of props.options) {
            if (props.selected === sel.key) {
                setSelectedLabel(sel.label)
                break
            }
        }
    }, [props.selected, props.options])

    useEffect(() => {
        let searchKey = search.toLowerCase()
        let filteredOpts = props.options.filter(item => {
            const itemLabel = item.label.toLowerCase()
            return itemLabel.indexOf(searchKey) > -1
        })
        setFilteredOptions(filteredOpts)
    }, [search, props.options])

    const placeholder =  `${ props.placeholder || 'Select' }*`

    return (
        <>
            <Button
                // sx={{minWidth: `${ props.minWidth || 300 }px`}}
                aria-label={props.ariaLabel}
                aria-controls={props.ariaControls}
                aria-haspopup="true"
                startIcon={<ExpandMoreIcon />}
                onClick={handleMenu}
                size="large"
                color="primary"
                variant="outlined">
                { selectedLabel || placeholder }
            </Button>
            
            {/* <TextField
                aria-label={props.ariaLabel}
                aria-controls={props.ariaControls}
                aria-haspopup="true"
                placeholder={props.placeholder || 'Search'}
                value={selectedLabel || ''}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
                onClick={handleMenu} /> */}
            <Menu
                id={props.ariaControls}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <TextField
                    sx={{marginRight: '10px', marginLeft: '10px'}}
                    placeholder={props.placeholder || 'Search'}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value)
                    }} />
                {/* render options */}
                {
                    filteredOptions.map((item, index) => {
                        return (
                            <Box key={index}>
                                <MenuItem
                                    disabled={item.key === props.selected}
                                    onClick={() => handleSelect(item.key)}>
                                    {
                                        item.Icon? (
                                            <ListItemIcon>
                                                <item.Icon />
                                            </ListItemIcon>
                                        ): null
                                    }
                                    <ListItemText>
                                        <Typography>{ item.label }</Typography>
                                        {
                                            item.subLabel? <Typography variant="caption" color="primary">{ item.subLabel }</Typography>: null
                                        }
                                    </ListItemText>
                                </MenuItem>
                                { index !== filteredOptions?.length - 1? <Divider />: null }
                            </Box>
                        )
                    })
                }
                {/* render no result */}
                {
                    !filteredOptions.length? (
                        <MenuItem
                            disabled={true}>
                            <ListItemText>
                                <Typography>
                                    { props.options.length === filteredOptions.length? 'No options available': 'No search result Found' }
                                </Typography>
                            </ListItemText>
                        </MenuItem>
                    ): null
                }
            </Menu>
        </>
    )
}

export default DropDownSearch