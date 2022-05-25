import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import AddIcon from '@mui/icons-material/Add'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import DownloadIcon from '@mui/icons-material/Download'

import HorizontalStepsNav from '../navs/horizontalStepsNav'
import OpenCloseBox from '../blocks/openCloseBox'

import utils from '../utilities'

// - import excel through copy paste
// - import excel through upload
// - option to create table

// - create table from clipboard
// * edit and evaluation mode
// * create editable table
// * editable column
// * editable row
// * add/remove column
// * add/remove row

const ImportTable = (props) => {
    const [states, setStates] = useState({
        importMode: 'add', // add || change
        importBox: true,
        header: ['Endpoint', 'Name', 'Type', 'Category', 'Subcategory'],
        data: []
    })

    const steps = [
        {
            icon: null,
            title: 'Import Data',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} style={ styles.container }>
                        <Typography
                            style={styles.caption}
                            variant='body1'>
                            There are multiple options when importing data, through importing excel file,
                            copy paste cells, drag and drop excel file or manual data creation.
                        </Typography>
                        {
                            states.importBox? null: (
                                <Box>
                                    <Box>
                                        <Button
                                            color='primary'
                                            variant='contained'
                                            startIcon={<AddIcon />}
                                            onClick={() => {
                                                setStates({...states, ...{
                                                    importBox: true,
                                                    importMode: 'add'
                                                }})
                                            }}>
                                            Add Data
                                        </Button>
                                        <Button
                                            style={{ marginLeft: 5 }}
                                            color='primary'
                                            variant='contained'
                                            startIcon={<ChangeCircleIcon />}
                                            onClick={() => {
                                                setStates({...states, ...{
                                                    importBox: true,
                                                    importMode: 'change'
                                                }})
                                            }}>
                                            Change Data
                                        </Button>
                                        <Button
                                            style={{ marginLeft: 5 }}
                                            color='primary'
                                            variant='outlined'
                                            startIcon={<DownloadIcon />}
                                            onClick={() => {
                                                console.log('download excel template')
                                            }}>
                                            Excel Template
                                        </Button>
                                    </Box>
                                    <Box>

                                    </Box>
                                </Box>
                            )
                        }
                        <OpenCloseBox
                            btnIcon={ <UploadFileIcon /> }
                            btnLabel={ 'Import Data' }
                            btnHide={ true }
                            isOpen={ states.importBox }
                            onOpen={ () => {
                                setStates({ ...states, ...{ importBox: true } })
                            }}
                            onClose={ () => {
                                setStates({ ...states, ...{ importBox: false } })
                            }}>
                            <Typography>test</Typography>
                        </OpenCloseBox>
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Import Data')
                await utils.waitFor(1)
                return true
            }
        },
        {
            icon: null,
            title: 'Modify Data',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} style={ styles.container }>
                        <Typography
                            style={styles.caption}
                            variant='body1'>
                            Update data or add rows and columns using this table editor.
                        </Typography>
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Modify Data')
                await utils.waitFor(1)
                return true
            }
        },
        {
            icon: null,
            title: 'Evaluate and Save',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} style={ styles.container }>
                        <Typography
                            style={styles.caption}
                            variant='body1'>
                            Bulk evaluate and save data.
                        </Typography>
                    </Grid>
                </Grid>
            ),
            action: async () => {
                console.log('Evaluate and Save')
                await utils.waitFor(1)
                return true
            }
        }
    ]

    let finalView = {
        component: (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        style={styles.caption}>
                        All steps completed. Please see the change details before
                        saving.
                    </Typography>
                </Grid>
            </Grid>
        ),
        action: async () => {
            console.log('finish button')

            // test for notifications
            // this will also serve as reference
            await utils.waitFor(1)

            return true
        }
    }

    return (
        <HorizontalStepsNav
            nextBtnLabel={ 'Save and Next' }
            finishBtnlabel={ 'Save and Finish' }
            disableLabelClick={ true }
            finalView={ finalView }
            views={ steps } />
    )
}

const styles = {
    container: {
        textAlign: 'left'
    },
    caption: {
        textIndent: 50,
        marginTop: 20,
        marginBottom: 10
    }
}

export default ImportTable