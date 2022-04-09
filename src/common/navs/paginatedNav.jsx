import { matchPath } from 'react-router'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Divider from '@mui/material/Divider'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

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

    let currentNav = navs[activeNav]
    let locationRoutes = currentNav.value.split('/')

    // clean and create breadcrumbs items
    locationRoutes = locationRoutes.filter((item, index) => {
        if (!Boolean(item)) return false
        if (index >= locationRoutes.length - 1) return false

        return true
    })

    let disabledNext = activeNav === (navs.length - 1)
    let disabledBack = activeNav === 0

    let routeOnTop = typeof props.routeOnTop === 'boolean'? props.routeOnTop: true

    const generateBreadCrumbs = () => {
        return (
            <Breadcrumbs
                style={{padding: 10}}
                separator={<ArrowRightIcon fontSize="small" />}
                aria-label="breadcrumb">
                {
                    locationRoutes.map((item, index) => (
                        <Link
                            key={'breadcrumb_' + index}
                            underline="none"
                            fontSize="small"
                            color="inherit">
                            { item.toUpperCase() }
                        </Link>
                    ))
                }
                <Link
                    underline="none"
                    color="text.primary"
                    fontSize="small"
                    aria-current="page">
                    { currentNav.label.toUpperCase() }
                </Link>
            </Breadcrumbs>
        )
    }

    return (
        <>
            {
                routeOnTop? (
                    <>
                        { generateBreadCrumbs() }
                        <Divider />
                    </>
                ): null
            }


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
            
            
            {
                !routeOnTop? (
                    <>
                        <Divider />
                        { generateBreadCrumbs() }
                    </>
                ): null
            }
        </>
    )
}

export default PaginatedNav