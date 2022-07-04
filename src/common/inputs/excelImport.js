import { useState, useRef, useContext } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import DownloadIcon from '@mui/icons-material/Download'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo'
// import SwipeRightAltIcon from '@mui/icons-material/SwipeRightAlt'
// import WidgetsIcon from '@mui/icons-material/Widgets';
// import PanToolIcon from '@mui/icons-material/PanTool'
import CreateIcon from '@mui/icons-material/Create'
import TableRowsIcon from '@mui/icons-material/TableRows'

import excelHandler from '../utilities/excelHandler'
import GlobalDialogContext from '../contexts/globalDialogContext'

const ExcelImport = (props) => {
    const globalDialogCtx = useContext(GlobalDialogContext)

    const [states, setStates] = useState({
        importMethod: 'importExcel', // importExcel || copyPaste || createEmptyCells
        importFiles: []
    })
    const uploadFile = useRef()
    const emptyCellsTextField = useRef()

    const onDataImported = (data = []) => {
        if (props.onDataImported) {
            props.onDataImported(data)
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography color='primary' variant='h6'>Import data</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    style={{ padding: 20 }}
                    fullWidth
                    color='primary'
                    variant={ states.importMethod === 'importExcel'? 'contained': 'outlined' }
                    startIcon={<UploadFileIcon />}
                    onClick={() => {
                        // console.log('upload csv')
                        setStates({ ...states, ...{ importMethod: 'importExcel' } })
                    }}>
                    Import Excel
                </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    style={{ padding: 20 }}
                    fullWidth
                    color='primary'
                    variant={ states.importMethod === 'copyPaste'? 'contained': 'outlined' }
                    startIcon={<ContentPasteGoIcon />}
                    onClick={() => {
                        // console.log('paste excel data')
                        setStates({ ...states, ...{ importMethod: 'copyPaste' } })
                    }}>
                    Paste Excel Data
                </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button
                    style={{ padding: 20 }}
                    fullWidth
                    color='primary'
                    variant={ states.importMethod === 'createEmptyCells'? 'contained': 'outlined' }
                    startIcon={<CreateIcon />}
                    onClick={() => {
                        // console.log('create empty cells')
                        setStates({ ...states, ...{ importMethod: 'createEmptyCells' } })
                    }}>
                    Create Empty cells
                </Button>
            </Grid>

            {/* import method content */}
            <Grid item xs={12} style={{ position: 'relative' }}>
                {
                    states.importMethod === 'importExcel'? (
                        <>
                            <input
                                style={{
                                    opacity: 0,
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%'
                                }}
                                onChange={async (e) => {
                                    // console.log('file change: ', e.target.files)
                                    let importFiles = []
                                    for (let file of e.target.files) {
                                        importFiles.push(file.name)
                                    }
                                    // console.log(importFiles)
                                    setStates({...states, importFiles})

                                    let excelData = await excelHandler.extractExcel(e)

                                    // console.log(excelData)
                                    if (excelData.data && excelData.data.length) {
                                        onDataImported(excelData.data)
                                    }
                                }}
                                multiple={ true }
                                accept=".csv, .xls, .xlsx"
                                ref={uploadFile}
                                type="file" />
                            <Box
                                sx={styles.methodInputContainer}>
                                <Box style={{ width: 300, margin: 'auto' }}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant='body1'>
                                                Import or drag and drop excel files here. <br />
                                                Acceptable file types are csv, xls and xlsx.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                color='primary'
                                                variant='outlined'
                                                startIcon={<DownloadIcon />}
                                                onClick={() => {
                                                    excelHandler.downloadTemplate(props.headers, 'data_template')
                                                }}>
                                                Template
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                fullWidth
                                                variant='contained'
                                                color='primary'
                                                startIcon={ <UploadFileIcon /> }
                                                onClick={() => {
                                                    if (uploadFile && uploadFile.current) {
                                                        uploadFile.current.click()
                                                    }
                                                }}>
                                                Import Files
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box style={{textAlign: 'left' }}>
                                                { states.importFiles.length?
                                                    states.importFiles.map(item => (
                                                        <Typography key={item} color='primary' variant='body1'>
                                                            { '- ' + item }
                                                        </Typography>
                                                    )): (
                                                        <Typography color='primary' variant='body1' style={{ textAlign: 'center' }}>
                                                            No items were selected!
                                                        </Typography>
                                                    )
                                                }
                                            </Box>
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                            <Button
                                                fullWidth
                                                variant='contained'
                                                color='primary'
                                                startIcon={ <WidgetsIcon /> }
                                                onClick={() => {
                                                    
                                                }}>
                                                Extract Data
                                            </Button>
                                        </Grid> */}
                                    </Grid>
                                </Box>
                            </Box>
                        </>
                    ): null
                }
                {
                    states.importMethod === 'copyPaste'? (
                        <Box
                            onPaste={(e) => {
                                let exlData = excelHandler.extractFromPastedData(e)
                                // console.log(exlData.tableData)
                                onDataImported(exlData.tableData)
                            }}
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
                                    excelHandler.downloadTemplate(props.headers, 'data_template')
                                }}>
                                Excel Template
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
                                    inputRef={emptyCellsTextField}
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
                                    startIcon={<TableRowsIcon />}
                                    onClick={async () => {
                                        let numBerOfEmptyCells = parseInt(emptyCellsTextField.current.value)
                                        numBerOfEmptyCells = numBerOfEmptyCells? numBerOfEmptyCells: 0

                                        if (numBerOfEmptyCells) {
                                            let data = excelHandler.generateEmptyCells(props.headers, numBerOfEmptyCells)
                                            onDataImported(data)
                                            // console.log('empty cells: ', numBerOfEmptyCells)
                                        } else {
                                            let result = await globalDialogCtx.showDialog({
                                                title: 'Alert',
                                                type: 'alert',
                                                message: 'The value you entered is zero or empty. Please Enter value grater than zero.'
                                            })
                                        }
                                    }}>
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
    },
    uploadInput: {

    }
}

export default ExcelImport