// import { useState, useContext } from 'react'

// import Link from '@mui/material/Link'
// import Container from '@mui/material/Container'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'

// import AccountContext from '../../common/contexts/accountContext'

const Notifications = (props) => {
    // const ctx = useContext(AccountContext)

    // const btnClicked = (e) => {
    //     ctx.setAccountContext({testVal: 'Notifications test value from context'})
    // }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>Notifications Content</Typography>
            </Grid>
        </Grid>
    )
}

export default Notifications