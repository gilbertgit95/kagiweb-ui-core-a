import { useState, useEffect, useRef } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'
import PanToolIcon from '@mui/icons-material/PanTool'
import CreateIcon from '@mui/icons-material/Create'
import TableRowsIcon from '@mui/icons-material/TableRows'
import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip'
// import { useTheme } from '@mui/material/styles'

import HorizontalStepsNav from '../navs/horizontalStepsNav'
import BasicTable from '../tables/basicTable'
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
        importMethod: 'uploadCSV', // uploadCSV || copyPaste || dragAndDrop || createEmptyCells
        importBox: true,

        importedData: [
            { name: 'test0001', calories: 'cal0001', fat: 'fat0001', carb: 'carb0001', protein: 'pro0001' },
            { name: 'test0002', calories: 'cal0002', fat: 'fat0002', carb: 'carb0002', protein: 'pro0002' },
            { name: 'test0003', calories: 'cal0003', fat: 'fat0003', carb: 'carb0003', protein: 'pro0003' },
            { name: 'test0004', calories: 'cal0004', fat: 'fat0004', carb: 'carb0004', protein: 'pro0004' },
            { name: 'test0005', calories: 'cal0005', fat: 'fat0005', carb: 'carb0005', protein: 'pro0005' },
            { name: 'test0006', calories: 'cal0006', fat: 'fat0006', carb: 'carb0006', protein: 'pro0006' },
            { name: 'test0001', calories: 'cal0001', fat: 'fat0001', carb: 'carb0001', protein: 'pro0001' },
            { name: 'test0002', calories: 'cal0002', fat: 'fat0002', carb: 'carb0002', protein: 'pro0002' },
            { name: 'test0003', calories: 'cal0003', fat: 'fat0003', carb: 'carb0003', protein: 'pro0003' },
            { name: 'test0004', calories: 'cal0004', fat: 'fat0004', carb: 'carb0004', protein: 'pro0004' },
            { name: 'test0005', calories: 'cal0005', fat: 'fat0005', carb: 'carb0005', protein: 'pro0005' },
            { name: 'test0006', calories: 'cal0006', fat: 'fat0006', carb: 'carb0006', protein: 'pro0006' },
            { name: 'test0001', calories: 'cal0001', fat: 'fat0001', carb: 'carb0001', protein: 'pro0001' },
            { name: 'test0002', calories: 'cal0002', fat: 'fat0002', carb: 'carb0002', protein: 'pro0002' },
            { name: 'test0003', calories: 'cal0003', fat: 'fat0003', carb: 'carb0003', protein: 'pro0003' },
            { name: 'test0004', calories: 'cal0004', fat: 'fat0004', carb: 'carb0004', protein: 'pro0004' },
            { name: 'test0005', calories: 'cal0005', fat: 'fat0005', carb: 'carb0005', protein: 'pro0005' },
            { name: 'test0006', calories: 'cal0006', fat: 'fat0006', carb: 'carb0006', protein: 'pro0006' },
        ],

        rowsProps: [],
        rows: []
    })
    const uploadFile = useRef()
    // const theme = useTheme()

    useEffect(() => {
        setStates({...states, ...{ rowsProps: props.headers }})
    }, [])

    const steps = [
        {
            icon: null,
            title: 'Import Data',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} style={ styles.container }>
                        {
                            states.importBox? null: (
                                <BasicTable
                                    headers={ props.headers }
                                    rows={ states.importedData }
                                    rightSideComponents={
                                        <>
                                            <Button
                                                style={{ marginLeft: 5 }}
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
                                            <Tooltip
                                                style={{ float: 'right' }}
                                                title={
                                                    <Typography
                                                        style={{...styles.caption, ...{ marginBottom: 20}}}
                                                        variant='body1'>
                                                        There are multiple options when importing data, through importing excel file,
                                                        copy paste cells, drag and drop excel file or manual data creation.
                                                    </Typography>
                                                }>
                                                <InfoIcon color='primary' />
                                            </Tooltip>
                                        </>
                                    } />
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
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography color='primary' variant='h6'>Import data</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <Button
                                        style={{ padding: 20 }}
                                        fullWidth
                                        color='primary'
                                        variant={ states.importMethod === 'uploadCSV'? 'contained': 'outlined' }
                                        startIcon={<UploadFileIcon />}
                                        onClick={() => {
                                            console.log('upload csv')
                                            setStates({ ...states, ...{ importMethod: 'uploadCSV' } })
                                        }}>
                                        Upload CSV
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <Button
                                        style={{ padding: 20 }}
                                        fullWidth
                                        color='primary'
                                        variant={ states.importMethod === 'dragAndDrop'? 'contained': 'outlined' }
                                        startIcon={<PanToolIcon />}
                                        onClick={() => {
                                            console.log('drag and drop excel file')
                                            setStates({ ...states, ...{ importMethod: 'dragAndDrop' } })
                                        }}>
                                        Drag and Drop CSV
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <Button
                                        style={{ padding: 20 }}
                                        fullWidth
                                        color='primary'
                                        variant={ states.importMethod === 'copyPaste'? 'contained': 'outlined' }
                                        startIcon={<ContentPasteGoIcon />}
                                        onClick={() => {
                                            console.log('paste excel data')
                                            setStates({ ...states, ...{ importMethod: 'copyPaste' } })
                                        }}>
                                        Paste Excel Data
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={3}>
                                    <Button
                                        style={{ padding: 20 }}
                                        fullWidth
                                        color='primary'
                                        variant={ states.importMethod === 'createEmptyCells'? 'contained': 'outlined' }
                                        startIcon={<CreateIcon />}
                                        onClick={() => {
                                            console.log('create empty cells')
                                            setStates({ ...states, ...{ importMethod: 'createEmptyCells' } })
                                        }}>
                                        Create Empty cells
                                    </Button>
                                </Grid>

                                {/* import method content */}
                                <Grid item xs={12}>
                                    {
                                        states.importMethod === 'uploadCSV'? (
                                            <Box
                                                sx={styles.methodInputContainer}>
                                                <Typography variant='body1'>
                                                    Upload a csv file from your file system.
                                                </Typography>
                                                <Button
                                                    style={{ marginRight: 5, marginTop: 10 }}
                                                    color='primary'
                                                    variant='outlined'
                                                    startIcon={<DownloadIcon />}
                                                    onClick={() => {
                                                        console.log('download data template')
                                                    }}>
                                                    Download Template
                                                </Button>
                                                <input
                                                    accept=".csv"
                                                    ref={uploadFile}
                                                    type="file"
                                                    hidden />
                                                <Button
                                                    style={{ marginTop: 10 }}
                                                    variant='contained'
                                                    color='primary'
                                                    startIcon={ <UploadFileIcon /> }
                                                    onClick={() => {
                                                        if (uploadFile && uploadFile.current) {
                                                            uploadFile.current.click()
                                                        }
                                                    }}>
                                                    Upload CSV
                                                </Button>
                                            </Box>
                                        ): null
                                    }
                                    {
                                        states.importMethod === 'dragAndDrop'? (
                                            <Box
                                                sx={styles.methodInputContainer}>
                                                <Typography variant='body1'>
                                                    Drag a csv file then drop it here.
                                                </Typography>
                                                <Button
                                                    style={{ marginRight: 5, marginTop: 10 }}
                                                    color='primary'
                                                    variant='outlined'
                                                    startIcon={<DownloadIcon />}
                                                    onClick={() => {
                                                        console.log('download data template')
                                                    }}>
                                                    Download Template
                                                </Button>
                                            </Box>
                                        ): null
                                    }
                                    {
                                        states.importMethod === 'copyPaste'? (
                                            <Box
                                                sx={styles.methodInputContainer}>
                                                <Typography variant='body1'>
                                                    Copy cells from an excel file including the data headers.
                                                </Typography>
                                                <Button
                                                    style={{ marginRight: 5, marginTop: 10 }}
                                                    color='primary'
                                                    variant='outlined'
                                                    startIcon={<DownloadIcon />}
                                                    onClick={() => {
                                                        console.log('download data template')
                                                    }}>
                                                    Download Template
                                                </Button>
                                            </Box>
                                        ): null
                                    }
                                    {
                                        states.importMethod === 'createEmptyCells'? (
                                            <Box
                                                sx={styles.methodInputContainer}>
                                                <Typography variant='body1'>
                                                    Create empty rows so you can populate this row cells
                                                    on the next step(Modify data).
                                                </Typography>
                                                <Box style={{ position: 'relative', height: 40, marginTop: 20 }}>
                                                    <TextField
                                                        size='small'
                                                        color='primary'
                                                        label='Number of rows'
                                                        type='number'
                                                        style={{ height: '100%', marginRight: 5 }} />
                                                    <Button
                                                        size='small'
                                                        variant='contained'
                                                        color='primary'
                                                        style={{ height: '100%' }}
                                                        startIcon={<TableRowsIcon />}>
                                                        Create
                                                    </Button>
                                                </Box>
                                            </Box>
                                        ): null
                                    }
                                </Grid>
                            </Grid>
                        </OpenCloseBox>
                    </Grid>
                </Grid>
            ),
            action: () => {
                console.log('Import Data')
                // await utils.waitFor(1)
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
        marginTop: 40,
        textAlign: 'left'
    },
    caption: {
        textIndent: 50,
        marginTop: 20,
        marginBottom: 10
    },
    methodInputContainer: {
        textAlign: 'center',
        border: '2px dashed',
        borderRadius: '10px',
        paddingTop: '100px',
        paddingBottom: '100px',
        borderColor: 'primary.main'
    }
}

export default ImportTable