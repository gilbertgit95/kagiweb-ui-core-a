
import React, { useState, useEffect, useContext } from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { useTheme } from '@mui/material/styles'
// import { useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
// import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import RouterContext from '../../common/contexts/routerContext'

const MainNav = (props) => {
  const [anchorElRightMenu, setAnchorElRightMenu] = useState(null)
  const [drawer, setDrawer] = useState({
      leftMenu: false,
      rightMenu: false
  })

  const routerCtx = useContext(RouterContext)

  const handleOpenRightMenu = (event) => {
    setAnchorElRightMenu(event.currentTarget)
  }

  const handleCloseRightMenu = () => {
    setAnchorElRightMenu(null)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setDrawer({ ...drawer, [anchor]: open })
  }

  const onClickNav = (e) => {
    // check for event info
    if (e && e.type) {
      // navigate to routes if the its a link
      if (e.type === 'link') {
        routerCtx.setRouterContext(e.value)

      // callback nav value if its an action
      } else if (e.type === 'action') {
        //  check for callback property
        if (props.onAction && typeof props.onAction == 'function') {
          props.onAction(e.value)
        }
      }
    }

    // return will imediately end the method in the stack
    return
  }

  const generateDrawerItems = (anchor, itemsGroup) => {

    return (
      <Box
        role="presentation">
        {
          itemsGroup.map((items, itemsIndex) => {
            return (
              <React.Fragment key={anchor + '_groupItemsFragment_' + itemsIndex}>
                <List key={anchor + '_groupItems_' + itemsIndex}>
                  {
                    items.map((item, index) => (
                      <ListItem
                        button
                        onClick={(e) => {
                          onClickNav({type: item.type, value: item.value})
                          if (item.type === 'action' || item.type === 'link') {
                            toggleDrawer(anchor, false)(e)
                          }
                        }}
                        key={anchor + '_groupChildItems_' + itemsIndex + '_' + index}>
                        <ListItemIcon>
                          { item.component? item.component: null }
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))
                  }
                </List>

                {/* divider */}
                { itemsIndex < itemsGroup.length -1? <Divider key={anchor + '_groupDivider_' + itemsIndex} />: null }
              </React.Fragment>
            )
          })
        }
      </Box>
    )
  }

  return (
    <AppBar
      position="fixed"
      style={props.isTransparent? { background: 'transparent', boxShadow: 'none'}: {}}>
      {/* <Grid container> */}
        <Toolbar disableGutters>

          {/* logo display for big screen size */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => {
              onClickNav({type: props.leftLogo.type, value: props.leftLogo.value})
            }}
            style={{ marginLeft: 20 }}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            { props.leftLogo? props.leftLogo.component: null }
          </Typography>

          {/* left drawer for small screen */}
          {
            props.leftMenu && props.leftMenu.length? (
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label={ props.leftLogo? props.leftLogo.label: '' }
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer('leftMenu', true)}
                  color="inherit">
                  <MenuIcon />
                </IconButton>
                <Drawer
                    anchor={'left'}
                    open={drawer['leftMenu']}
                    onClose={toggleDrawer('leftMenu', false)}>
                    { generateDrawerItems('leftMenu', props.leftMenu? props.leftMenu: []) }
                </Drawer>
              </Box>
            ): null
          }

          {/* logo display for small screen size */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => {
              onClickNav({type: props.leftLogo.type, value: props.leftLogo.value})
            }}
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            { props.leftLogo? props.leftLogo.component: null }
          </Typography>

          {/* main menu display for bigscreen size */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
              props.leftMenu? props.leftMenu.map((items, itemsIndex) => {
                return (
                  items.map((item, index) => (
                    <Button
                      onClick={() => {
                        onClickNav({type: item.type, value: item.value})
                      }}
                      key={'groupPlainItems_' + itemsIndex + '_' + index}
                      // onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}>
                      { item.label }
                    </Button>
                  ))
                )
              }): null
            }
          </Box>

          {/* right settings section */}
          <Box style={{ marginRight: 20 }} sx={{ flexGrow: 0 }}>
            {/* middle menu */}
            {
              props.middleMenu? props.middleMenu.map((item, index) => {
                return (
                  <Tooltip
                    onClick={() => {
                      onClickNav({type: item.type, value: item.value})
                    }}
                    title={ item.label }
                    style={{marginRight: 15}}
                    key={'middleMenu_' + index}>
                    { item.component }
                  </Tooltip>
                )
              }): null
            }

            {/* right menu */}
            {/* right menu for big screen */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'inline-block' } }}>
              <Tooltip title={ props.rightLogo? props.rightLogo.label: '' }>
                <IconButton onClick={handleOpenRightMenu} sx={{ p: 0 }}>
                  { props.rightLogo? props.rightLogo.component: null }
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElRightMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElRightMenu)}
                onClose={handleCloseRightMenu}>
                {
                  props.rightMenu? props.rightMenu.map((items, itemsIndex) => {
                    return (
                      <List key={'rightMenuDDgroupItems_' + itemsIndex}>
                        {
                          items.map((item, index) => (
                            <MenuItem
                              key={'rightMenuDDgroupChildItems_' + itemsIndex + '_' + index}
                              onClick={() => {
                                onClickNav({type: item.type, value: item.value})
                                if (item.type === 'action' || item.type === 'link') {
                                  handleCloseRightMenu()
                                }
                              }}>
                              <ListItemIcon>
                                { item.component? item.component: null }
                              </ListItemIcon>
                              <Typography textAlign="center">{item.label}</Typography>
                            </MenuItem>
                          ))
                        }
                        {/* divider */}
                        { itemsIndex < props.rightMenu.length -1? <Divider key={'rightMenuDDgroupItems_groupDivider_' + itemsIndex} />: null }
                      </List>
                    )
                  }): null
                }
              </Menu>
            </Box>

            {/* right settings for small screen */}
            <Box sx={{ flexGrow: 1, display: { xs: 'inline-block', md: 'none' } }}>
              <Tooltip title={ props.rightLogo? props.rightLogo.label: '' }>
                <IconButton
                  sx={{ p: 0 }}
                  onClick={toggleDrawer('rightMenu', true)}>
                  { props.rightLogo? props.rightLogo.component: null }
                </IconButton>
              </Tooltip>
              <Drawer
                anchor={'top'}
                open={drawer['rightMenu']}
                onClose={toggleDrawer('rightMenu', false)}>
                { generateDrawerItems('rightMenu', props.rightMenu? props.rightMenu: []) }
              </Drawer>
            </Box>
          </Box>
        </Toolbar>
      {/* </Container> */}
    </AppBar>
  )
}
export default MainNav