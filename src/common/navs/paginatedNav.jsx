import { useState, useEffect } from 'react'
import { matchPath } from 'react-router'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

const PaginatedNav = (props) => {

    const theme = useTheme();
    const location = useLocation()

    const handleNext = (navs, aNav) => {
        let nextNav = aNav + 1

        if (props.onChangeNav) props.onChangeNav(navs[nextNav])
    }

    const handleBack = (navs, aNav) => {
        let nextNav = aNav - 1

        if (props.onChangeNav) props.onChangeNav(navs[nextNav])
    }

    let activeNav = 0
    let navs = (props.navMenu || [])
        .reduce((acc, item) => {
            acc = [...acc, ...item]
            return acc
        }, [])
        .filter(item => item.type === 'link')
        .map(item => ({
            type: item.type,
            value: item.value,
            label: item.label
        }))

    navs.forEach((item, index) => {

        let match = matchPath(
            {
                path: item.value,
                exact: true,
                strict: true
            },
            location.pathname
        )

        if (match) activeNav = index
    })

    let disabledNext = activeNav === (navs.length - 1)
    let disabledBack = activeNav === 0

    return (
        <>
            <MobileStepper
                steps={ navs.length }
                variant="dots"
                position="static"
                activeStep={ activeNav }
                sx={{ maxWidth: '100%', flexGrow: 1 }}
                nextButton={
                    <Button size="small" onClick={ () => handleNext(navs, activeNav) } disabled={ disabledNext }>
                        { disabledNext? 'Next':  navs[activeNav + 1].label }
                        { theme.direction === 'rtl' ? <KeyboardArrowLeft />: <KeyboardArrowRight /> }
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={() => handleBack(navs, activeNav) } disabled={ disabledBack }>
                        { theme.direction === 'rtl' ?  <KeyboardArrowRight />: <KeyboardArrowLeft /> }
                        { disabledBack? 'Back':  navs[activeNav - 1].label }
                    </Button>
                } />
        </>
    )
}

export default PaginatedNav