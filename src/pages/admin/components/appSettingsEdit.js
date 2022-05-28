import React, { useEffect, useContext } from 'react'
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// import AccountContext from '../../../common/contexts/accountContext'
import VerticalSteps from '../../../common/navs/verticalStepsNav'
import utils from '../../../common/utilities'

const AppSettingsEdit = (props) => {

    const steps = [
        {
            icon: null,
            title: 'Settings A',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            style={styles.caption}
                            variant='body1'>
                            lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TextField
                            fullWidth
                            label="SettingsA1" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TextField
                            fullWidth
                            label="SettingsA2" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <TextField
                            fullWidth
                            label="SettingsA3" />
                    </Grid>
                </Grid>
            ),
            action: () => {
                console.log('Settings A')
                // await utils.waitFor(1)
                return true
            }
        },
        {
            icon: null,
            title: 'Settings B',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            style={styles.caption}
                            variant='body1'>
                            lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="SettingsB1" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="SettingsB2" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="SettingsB3" />
                    </Grid>
                </Grid>
            ),
            action: () => {
                console.log('Settings B')
                // await utils.waitFor(1)
                return true
            }
        },
        {
            icon: null,
            title: 'Settings C',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            style={styles.caption}
                            variant='body1'>
                            lorem ipsum gets its name from the Latin phrase Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="SettingsC1" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="SettingsC2" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="SettingsC3" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <TextField
                            fullWidth
                            label="SettingsC4" />
                    </Grid>
                </Grid>
            ),
            action: () => {
                console.log('Settings C')
                // await utils.waitFor(1)
                return true
            }
        }
    ]

    let finalView = {
        component: (
            <>
                <Typography>
                    All steps completed. Please see the change details before
                    saving.
                </Typography>
            </>
        ),
        action: async () => {
            console.log('finish button')

            await utils.waitFor(1)

            return true
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <VerticalSteps
                    nextBtnLabel={ 'Next' }
                    finishBtnlabel={ 'Finish' }
                    finalBtnLabel={ 'Save Changes' }
                    disableLabelClick={ false }
                    finalView={ finalView }
                    views={ steps } />
            </Grid>
        </Grid>
    )
}

const styles = {
    caption: {
        textIndent: 50,
        marginTop: 20,
        marginBottom: 10
    }
}

export default AppSettingsEdit