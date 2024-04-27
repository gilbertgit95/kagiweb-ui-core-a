import React from 'react'
import { Divider, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

interface IOption {
    key: string,
    label: string,
    Icon?: React.FC
}

interface IProps {
    selected?: string,
    options: IOption[],
    ariaLabel: string,
    ariaControls: string,
    placeholder?: string
}

const DropDownSearch = (props: IProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleSelect = (selected:string) => {
        console.log(selected)
    }

    return (
        <>
            <TextField
                aria-label={props.ariaLabel}
                aria-controls={props.ariaControls}
                aria-haspopup="true"
                placeholder={props.placeholder || 'Search'}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                    ),
                }}
                onClick={handleMenu} />
            <Menu
                id={props.ariaControls}
                // anchorPosition={{
                //     vertical: 'top',
                //     horizontal: 'left'
                // }}
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
                    }} />
                {
                    props.options.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <MenuItem onClick={() => handleSelect(item.key)}>
                                    {
                                        item.Icon? (
                                            <ListItemIcon>
                                                <item.Icon />
                                            </ListItemIcon>
                                        ): null
                                    }
                                    <ListItemText>{ item.label }</ListItemText>
                                </MenuItem>
                                { index !== props.options?.length - 1? <Divider />: null }
                            </React.Fragment>
                        )
                    })
                }
            </Menu>
        </>
    )
}

export default DropDownSearch