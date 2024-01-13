// import React from "react";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import MenuIcon from '@mui/icons-material/Menu';
import PagesIcon from '@mui/icons-material/Pages';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useLocation } from 'react-router-dom';

interface IMenu {
    label:string,
    url:string
}

type Props = {
    links?: IMenu[]
}

const PrimaryNav = (props:Props) => {
    const location = useLocation();
    const { pathname } = location
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleItemClick = (item:IMenu) => {
        window.location.replace(item.url)
    }
    const links = props.links? props.links.filter(item => item.url !== pathname): []

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
                    <PagesIcon />
                </IconButton>
                {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography> */}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open} 
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}>
                    {
                        links.map((item, index) => {
                            return <MenuItem key={index} onClick={() => {handleItemClick(item)}}>
                                { item.label }
                            </MenuItem>
                        })
                    }
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default PrimaryNav