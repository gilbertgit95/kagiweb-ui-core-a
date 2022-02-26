import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import { useNavigate } from "react-router-dom"
import utils from '../../utilities'

const Logout = (props) => {
    const [navRoute, setNavRoute] = useState(null)
    const navigate = useNavigate()

    // life cycles
    useEffect(() => {
        // use to navigate
        if (navRoute) {
            navigate(navRoute)
        }
    }, [navRoute, navigate])

    useEffect(() => {
        let cancel = false
        console.log('init cancel false')
        async function redirect() {
            // use temporary wait to
            // recreate logging out request
            await utils.waitFor(3)

            // then redirect after successful logout
            if (!navRoute && !cancel) {
                console.log('inside if condition')
                setNavRoute('/auth/login')
            }
        }

        redirect()

        return () => {
            console.log('cancel to true')
            cancel = true
        }
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    Signing out...
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <CircularProgress />
            </Grid>
        </Grid>
    )
}

export default Logout