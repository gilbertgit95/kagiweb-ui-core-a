import { useState, useRef } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'
import PanToolIcon from '@mui/icons-material/PanTool'
import CreateIcon from '@mui/icons-material/Create'
import TableRowsIcon from '@mui/icons-material/TableRows'

const ExcelImport = (props) => {
    const [states, setStates] = useState({
        importMethod: 'uploadCSV', // uploadCSV || copyPaste || dragAndDrop || createEmptyCells
        importedData: []
    })
    const uploadFile = useRef()

    const onDataImported = () => {
        let data = []

        if (props.onDataImported) {
            props.onDataImported(data)
        }
    }

    return (
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
    )
}

const styles = {
    methodInputContainer: {
        textAlign: 'center',
        border: '2px dashed',
        borderRadius: '10px',
        paddingTop: '100px',
        paddingBottom: '100px',
        borderColor: 'primary.main'
    }
}

export default ExcelImport