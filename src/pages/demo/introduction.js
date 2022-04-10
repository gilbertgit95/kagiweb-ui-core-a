// import { useState, useContext } from 'react'
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

const Introduction = (props) => {
    // const ctx = useContext(AccountContext)

    // const btnClicked = (e) => {
    //     ctx.setAccountContext({testVal: 'Home test value from context'})
    // }

    return (
        <SubPageslayout
            navAnchor={'left'}
            navMenu={subpages}>
            <Grid item xs={12}>
                <Typography>Introduction</Typography>
            </Grid>
        </SubPageslayout>
    )
}

export default Introduction