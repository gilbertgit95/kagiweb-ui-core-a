// import React from "react";
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

export type TLink = {
    url?: string,
    label: string,
    Icon?: FC,
    action?: Function
}

export type TLinkGroup = {
    label?: string,
    links?: TLink[]
}

type Props = {
    MenuIcon?: FC,
    linkGroups?: TLinkGroup[],
    CustomEl?: FC,
    manuIsDrawer?: boolean
}

const PrimaryNav = (props:Props) => {
    const location = useLocation()
    const navigate = useNavigate()
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
        if (item.action) {
            await item.action()
        }
        // if (item.url) window.location.replace(item.url)
        if (item.url) {
            navigate(item.url)
            handleClose()
        }
    }

    return (
        <AppBar position="sticky">
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
                {
                    props.manuIsDrawer? (
                        <Drawer
                            anchor={'left'}
                            open={open}
                            onClose={handleClose}>
                            {
                                props.linkGroups?.map((lg, lgIndex) => {
                                    if (!lg.links?.length) return null
                                    return (
                                        <React.Fragment key={lgIndex}>
                                            <Typography color="primary" sx={{margin: '10px'}}>{ lg.label }</Typography>
                                            {/* <Divider /> */}
                                            <List>
                                                {
                                                    lg.links?.map((item, index) => (
                                                        <ListItem
                                                            disablePadding
                                                            key={index}>
                                                            <ListItemButton
                                                                onClick={() => {handleItemClick(item)}}
                                                                disabled={item.url === pathname}>
                                                                {
                                                                    item.Icon? (
                                                                        <ListItemIcon>
                                                                            <item.Icon />
                                                                        </ListItemIcon>
                                                                    ): null
                                                                }
                                                                <ListItemText primary={item.label} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                            {/* <Divider /> */}
                                            { (props.linkGroups?.length === (lgIndex + 1))? null: <Divider /> }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </Drawer>
                    // ): null
                    ): (
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open} 
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}>
                            <Box>
                                {
                                    props.linkGroups?.map((lg, lgIndex) => {
                                        if (!lg.links?.length) return null
                                        return (
                                            <React.Fragment key={lgIndex}>
                                                <Typography color="primary" sx={{margin: '10px'}}>{ lg.label }</Typography>
                                                {
                                                    lg.links?.map((item, index) => {
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
                                                { (props.linkGroups?.length === (lgIndex + 1))? null: <Divider /> }
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </Box>
                        </Menu>
                    )
                }

                {
                    props.CustomEl? <props.CustomEl />: null
                }
            </Toolbar>
        </AppBar>
    )
}

export default PrimaryNav