import React, {useContext, useState, useEffect, useRef} from 'react'
import { matchPath } from 'react-router'
import { useLocation } from 'react-router-dom'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import PaginatedNav from '../../common/navs/paginatedNav'
import RouterContext from '../../common/contexts/routerContext'

const navAnchors = new Set(['left', 'right'])

const SubPagesLayout = (props) => {

    // default to left when no anchore is setted
    const navAnchor = props.navAnchor && navAnchors.has(props.navAnchor)? props.navAnchor: 'left'

    const routerCtx = useContext(RouterContext)
    const location = useLocation()
    const [veryLong, setVeryLong] = useState(false)
    const mainSection = useRef()
    // const navigate = useNavigate()

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
            role='presentation'>
            {
              itemsGroup.map((items, itemsIndex) => {
                return (
                  <React.Fragment key={anchor + '_groupItemsFragment_' + itemsIndex}>
                    <List
                      // style={{ position: 'fixed' }}
                      key={anchor + '_groupItems_' + itemsIndex}>
                      {
                        items.map((item, index) => {
                          let match = null

                          // proceed to matching if item is a link
                          if (item.type === 'link') {
                            match = matchPath(
                              {
                                path: item.value,
                                exact: true,
                                strict: true
                              },
                              location.pathname
                            )
                          }

                          return (
                            <ListItem
                              button
                              selected={ Boolean(match) }
                              onClick={(e) => {
                                onClickNav({type: item.type, value: item.value})
                              }}
                              key={anchor + '_groupChildItems_' + itemsIndex + '_' + index}>
                              <ListItemIcon>
                                { item.component? item.component: null }
                              </ListItemIcon>
                              <ListItemText primary={item.label} />
                            </ListItem>
                          )
                        })
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


    useEffect(() => {
      const onScroll = () => {
        let mainSectionHeight = 0
        let windowHeight = window.innerHeight

        if (mainSection && mainSection.current && mainSection.current.clientHeight) {
          mainSectionHeight = mainSection.current.clientHeight

          setVeryLong(mainSectionHeight >= windowHeight)
        }
      }

      window.addEventListener('scroll', onScroll)
      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }, [])

    return (
        <Box>
            <Grid container spacing={2}>
                {
                  navAnchor === 'left'? (
                    <Grid
                      item md={3} lg={2}
                      style={{ padding: 0 }}
                      sx={{ display: { xs: 'none', sm: 'none', md: 'block' }}}>
                      { generateDrawerItems('subPagesNav', props.navMenu? props.navMenu: []) }
                    </Grid>
                  ): null
                }

                <Grid item xs={12} sm={12} md={9} lg={10} style={{textAlign: 'center'}}>
                    <Container>
                      <Box
                        sx={{
                          display: { sm: 'block', md: 'none' },
                        }}>
                        <PaginatedNav
                          navMenu={ props.navMenu }
                          onChangeNav={(e) => {
                            onClickNav({type: e.type, value: e.value})
                          }} />
                      </Box>
                      <Box ref={mainSection}>
                          { props.children? props.children: null }
                      </Box>
                      
                      {/* show pagination when in mobile view and when the page is long */}
                      {
                        veryLong? (
                          <Box
                            sx={{
                              display: { sm: 'block', md: 'none' },
                            }}>
                            <PaginatedNav
                              routeOnTop={false}
                              navMenu={ props.navMenu }
                              onChangeNav={(e) => {
                                onClickNav({type: e.type, value: e.value})
                              }} />
                          </Box>
                        ): null
                      }
                    </Container>
                </Grid>

                {
                  navAnchor === 'right'? (
                    <Grid
                      item md={3} lg={2}
                      sx={{ display: { xs: 'none', sm: 'none', md: 'block' }}}>
                      { generateDrawerItems('subPagesNav', props.navMenu? props.navMenu: []) }
                    </Grid>
                  ): null
                }
            </Grid>
        </Box>
    )
}

export default SubPagesLayout