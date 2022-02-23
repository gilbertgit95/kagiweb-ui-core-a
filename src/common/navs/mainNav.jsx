
import { useState, useEffect } from 'react'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Badge from '@mui/material/Badge'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const MainNav = (props) => {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [drawer, setDrawer] = useState({
      leftMenu: false,
      rightMenu: false
  })

  const handleOpenRightMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseRightMenu = () => {
    setAnchorElUser(null)
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

  const generateList = (anchor, itemsGroup) => {

    if (props.mainMenu) {
        // compute array of munus, including divisions
    }

    return (
      <Box
        // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}>
        {
          itemsGroup.map((items, itemsIndex) => {
            return (
              <React.Fragment key={anchor + '_groupItemsFragment_' + itemsIndex}>
                <List key={anchor + '_groupItems_' + itemsIndex}>
                  {
                    items.map((item, index) => (
                      <ListItem button key={anchor + '_groupChildItems_' + itemsIndex + '_' + index}>
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* logo display for big screen size */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            { props.leftLogo? props.leftLogo.component: null }
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label={ props.leftLogo? props.leftLogo.label: '' }
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer('menu', true)}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer
                anchor={'left'}
                open={drawer['menu']}
                onClose={toggleDrawer('menu', false)}>
                { generateList('leftMenu', props.leftMenu? props.leftMenu: []) }
            </Drawer>
          </Box>

          {/* logo display for small screen size */}
          <Typography
            variant="h6"
            noWrap
            component="div"
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
          <Box sx={{ flexGrow: 0 }}>
            {/* middle menu */}
            {
              props.middleMenu? props.middleMenu.map((item, index) => {
                return (
                  <Tooltip
                    title={ item.label }
                    style={{marginRight: 15}}
                    key={'middleMenu_' + index}>
                    { item.component }
                  </Tooltip>
                )
              }): null
            }

            {/* right menu */}
            <Tooltip title={ props.rightLogo? props.rightLogo.label: '' }>
              <IconButton onClick={handleOpenRightMenu} sx={{ p: 0 }}>
                { props.rightLogo? props.rightLogo.component: null }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseRightMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseRightMenu}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default MainNav