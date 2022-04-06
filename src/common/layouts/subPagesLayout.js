import React, {useContext} from 'react'
// import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
// import MenuList from '@mui/material/MenuList'
// import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
// import Check from '@mui/icons-material/Check'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'

import RouterContext from '../../common/context/routerContext'

const drawerWidth = 200
const navAnchors = new Set(['left', 'right'])

const SubPagesLayout = (props) => {

    // default to left when no anchore is setted
    const navAnchor = props.navAnchor && navAnchors.has(props.navAnchor)? props.navAnchor: 'left'

    // const [navRoute, setNavRoute] = useState(null)
    const routerCtx = useContext(RouterContext)
    // const navigate = useNavigate()

    const onClickNav = (e) => {
        // check for event info
        if (e && e.type) {
          // navigate to routes if the its a link
          if (e.type === 'link') {
            // console.log(e)
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
            // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role='presentation'>
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

    // life cycles
    // useEffect(() => {
    //     // use to navigate
    //     if (navRoute) {
    //       console.log('change route in subpages triggered: ', navRoute) 
    //       navigate(navRoute)
    //     }
    // }, [navRoute, navigate])
    

    return (
        <Container maxWidth='lg'>
            <Box>
                <Drawer
                    variant='permanent'
                    anchor={navAnchor}
                    sx={{
                        display: { xs: 'none', sm: 'none', md: 'block' },
                        flexShrink: 0,
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open>
                    <Toolbar />
                    <Divider />
                    {/* <MenuList dense>
                        <MenuItem selected={true}>
                            <ListItemText inset>Single</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText inset>1.15</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText inset>Double</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Check />
                            </ListItemIcon>
                            Custom: 1.2
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemText>Add space before paragraph</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>Add space after paragraph</ListItemText>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemText>Custom spacing...</ListItemText>
                        </MenuItem>
                    </MenuList> */}
                    { generateDrawerItems('subPagesNav', props.navMenu? props.navMenu: []) }
                </Drawer>
                <Grid container spacing={2}>
                    {/* <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography variant='h4' gutterBottom component='div'>
                            { config.appName }
                        </Typography>
                    </Grid> */}
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Box>
                            { props.children? props.children: null }
                        </Box>
                    </Grid>
                    {/* <Grid item xs={12} style={{textAlign: 'center'}}>
                        <Typography variant='caption' display='block' gutterBottom>
                            Copyrights 2021
                        </Typography>
                    </Grid> */}
                </Grid>
            </Box>
        </Container>
    )
}

export default SubPagesLayout