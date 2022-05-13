import React, { useEffect, useRef, useContext } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import FileUploadIcon from '@mui/icons-material/FileUpload'

import AccountContext from '../../../common/contexts/accountContext'
import VerticalSteps from '../../../common/navs/verticalStepsNav'
import RadioList from '../../../common/inputs/radioList'
import utils from '../../../common/utilities'

const AccountProfileEdit = (props) => {
    const accountCtx = useContext(AccountContext)
    const uploadProfilePicRef = useRef()

    const steps = [
        {
            icon: null,
            title: 'Basic Profile',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}
                        style={{...styles.grid, ...{ textAlign: '-webkit-center', margin: 'auto'}}}>
                        <Avatar
                            alt="Profile Picture"
                            src="/favicon.png"
                            sx={{ width: 200, height: 200 }} />
                        <input
                            accept=".jpg, .png, .jpeg, .gif, .bmp"
                            ref={uploadProfilePicRef}
                            type="file"
                            hidden />
                        <Button
                            color='primary'
                            variant='outlined'
                            onClick={() => {
                                if (uploadProfilePicRef && uploadProfilePicRef.current) {
                                    uploadProfilePicRef.current.click()
                                }
                            }}
                            style={{ marginTop: 30 }}
                            startIcon={ <FileUploadIcon /> }>
                            Upload Image
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <Typography
                            color='primary'
                            style={{...styles.fields, ...{ marginTop: 15 }}}
                            variant='body1'>
                            Gender
                        </Typography>
                        <Box style={{ padding: 30, paddingTop: 15 }}>
                            <RadioList
                                radioListName='Gender'
                                onChange={(e) => {}}
                                selected={'male'}
                                colSize={{xs: 6}}
                                list={[
                                    { disabled: false, key: 'male', label: 'Male'},
                                    { disabled: false, key: 'female', label: 'Female'}
                                ]} />
                        </Box>
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Nick Name" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="First Name" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Middle Name" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Last Name" />
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Basic Profile')
                await utils.waitFor(1)
                return true
            }
        },
        {
            icon: null,
            title: 'Advance Profile',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Nationality" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Birth Date" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Birth Place" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <TextField
                            style={styles.fields}
                            rows={2}
                            multiline
                            fullWidth
                            label="Home Address" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Personal Website" />
                        <TextField
                            style={styles.fields}
                            rows={3}
                            multiline
                            fullWidth
                            label="Bio" />
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Advance Profile')
                await utils.waitFor(1)
                return true
            }
        },
        {
            icon: null,
            title: 'Work Related Profile',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Job Title" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Company Name" />
                        <TextField
                            style={styles.fields}
                            rows={5}
                            multiline
                            fullWidth
                            label="Company Description" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}
                        style={styles.grid}>
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Industry Type" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Contact Email" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Contact Number" />
                        <TextField
                            style={styles.fields}
                            fullWidth
                            label="Company Website" />
                        <TextField
                            style={styles.fields}
                            rows={2}
                            multiline
                            fullWidth
                            label="Work Address" />
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Work Related Profile')
                await utils.waitFor(1)
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

    useEffect(() => {
        console.log('data in account edit: ', accountCtx.accountContext)

    },[accountCtx.accountContext])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <VerticalSteps
                    nextBtnLabel={ 'Save and Next' }
                    finishBtnlabel={ 'Save and Finish' }
                    finalBtnLabel={ 'Save Changes' }
                    disableLabelClick={ false }
                    finalView={ finalView }
                    views={ steps } />
            </Grid>
        </Grid>
    )
}

const styles = {
    grid: {
        paddingTop: 0
    },
    fields: {
        marginTop: 10
    }
}

export default AccountProfileEdit