import { useEffect, useState } from 'react'

import subpages from './lib/subPages'
import SubPageslayout from '../../common/layouts/subPagesLayout'

// import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'

// import AccountContext from '../../common/context/accountContext'
import GenBlock from '../../common/blocks/genBlock'
import BasicList from '../../common/lists/basicList'

const items = [
    'Item number 1',
    'Item number 2',
    'Item number 3',
    'Item number 4',
    'Item number 5'
]

const Lists = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    // const ctx = useContext(AccountContext)

    // const btnClicked = (e) => {
    //     ctx.setAccountContext({testVal: 'Home test value from context'})
    // }

    useEffect(() => {
        const fetchData = () => {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }

        fetchData()
    }, [])

    return (
        <SubPageslayout
            navAnchor={'left'}
            navMenu={subpages}>
            <Grid item xs={12}>
                <GenBlock
                    isLoading={isLoading}
                    title={'Basic List Component'}
                    description={`The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                    ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                    or desires to obtain pain of itself`}>
                    <Typography variant='body1'>
                        The lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem
                        ipsum quia dolor sit amet. which translates to “Nor is there anyone who loves or pursues
                        or desires to obtain pain of itself, because it is pain. The lorem ipsum gets its name
                        from the Latin phrase Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.
                        which translates to “Nor is there anyone who loves or pursues or desires to obtain pain
                        of itself, because it is pain.
                    </Typography>
                    <BasicList
                        // variant="ordered"
                        colSize={{xs: 12, sm: 6}}
                        list={items} />
                </GenBlock>
            </Grid>
        </SubPageslayout>
    )
}

export default Lists