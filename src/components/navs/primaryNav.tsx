// import React from "react";
import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import MenuIcon from '@mui/icons-material/Menu';
// import PagesIcon from '@mui/icons-material/Pages';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// import ContentCut from '@mui/icons-material/ContentCut';
// import Typography from '@mui/material/Typography';

import { useLocation } from 'react-router-dom';

export type TLink = {
    url?: string,
    label: string,
    Icon?: FC,
    action?: Function
}
       
type Props = {
    MenuIcon?: FC,
    links?: TLink[]
    CustomEl?: FC
}

const PrimaryNav = (props:Props) => {
    const location = useLocation()
    const { pathname } = location
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleItemClick = async (item:TLink) => {
        if (item.action) await item.action()
        if (item.url) window.location.replace(item.url)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleMenuClick}>
                    { props.MenuIcon? <props.MenuIcon />: <MenuIcon /> }
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open} 
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}>
                    {
                        props.links?.map((item, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    disabled={item.url === pathname}
                                    onClick={() => {handleItemClick(item)}}>
                                    {
                                        item.Icon? (
                                            <ListItemIcon>
                                                <item.Icon />
                                            </ListItemIcon>
                                        ): null
                                    }
                                    <ListItemText>{ item.label }</ListItemText>
                                </MenuItem>
                            )
                        })
                    }
                </Menu>
                {
                    props.CustomEl? <props.CustomEl />: null
                }
            </Toolbar>
        </AppBar>
    )
}

export default PrimaryNav