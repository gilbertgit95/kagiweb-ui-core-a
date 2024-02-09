import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export interface ITabItem {
  label: string,
  Icon?: string | React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  route: string
}

interface Props {
    tabs: ITabItem[]
}

const samePageLinkNavigation = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return false;
    }
    return true;
}

const TabsLayout = (props:Props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const path = location?.pathname || ''

    let routeIndex = 0
    props.tabs.forEach((item, index) => {
      if (path.indexOf(item.route) === 0) routeIndex = index
    })
  
    const handleChange = (event: React.SyntheticEvent, tabIndex: number) => {
      // event.type can be equal to focus with selectionFollowsFocus.
      if (
        event.type !== 'click' ||
        (event.type === 'click' &&
          samePageLinkNavigation(
            event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
          ))
      ) {
        const tab = props.tabs[tabIndex]
        navigate(tab.route)
      }
    }
  
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={routeIndex}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
          role='navigation'>
          {
            props.tabs.map((item, index) => {
              return <Tab key={index} label={ item.label } icon={item.Icon} iconPosition='start' />
            })
          }
        </Tabs>
      </Box>
    )
}

export default TabsLayout