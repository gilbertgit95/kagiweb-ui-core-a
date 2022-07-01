import { useState } from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
// import DeleteIcon from '@mui/icons-material/Delete;
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip'

import HorizontalStepsNav from '../navs/horizontalStepsNav'
import BasicTable from '../tables/basicTable'
import OpenCloseBox from '../blocks/openCloseBox'
import ExcelImport from './excelImport'

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

        importedData: [],
        modifyData: [],
        evaluateData: []
    })

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
                                                placement='bottom-end'
                                                title={
                                                    <Typography
                                                        style={{ padding: 10 }}
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
                            <ExcelImport
                                headers={ props.headers }
                                onDataImported={(data) => {
                                    if (states.importMode === 'add') {
                                        setStates({ ...states, ...{
                                            importedData: [...data, ...states.importedData],
                                            importBox: false
                                        }})
                                    } else if (states.importMode === 'change') {
                                        setStates({ ...states, ...{
                                            importedData: data,
                                            importBox: false
                                        }})
                                    }
                                }} />
                        </OpenCloseBox>
                    </Grid>
                </Grid>
            ),
            action: () => {
                return true
            }
        },
        {
            icon: null,
            title: 'Modify Data',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} style={ styles.container }>
                        <BasicTable
                            headers={ props.headers }
                            rows={ states.modifyData }
                            rightSideComponents={
                                <>
                                    <Button
                                        style={{ marginLeft: 5 }}
                                        color='primary'
                                        variant='contained'
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            console.log('add row')
                                            // setStates({...states, ...{
                                            //     importBox: true,
                                            //     importMode: 'add'
                                            // }})
                                        }}>
                                        Add Row
                                    </Button>
                                    <Button
                                        style={{ marginLeft: 5 }}
                                        color='primary'
                                        variant='contained'
                                        startIcon={<ClearIcon />}
                                        onClick={() => {
                                            console.log('remove selected row')
                                            // setStates({...states, ...{
                                            //     importBox: true,
                                            //     importMode: 'add'
                                            // }})
                                        }}>
                                        Remove Selected
                                    </Button>
                                    <Tooltip
                                        style={{ float: 'right' }}
                                        placement='bottom-end'
                                        title={
                                            <Typography
                                                style={{ padding: 10 }}
                                                variant='body1'>
                                                There are multiple options when importing data, through importing excel file,
                                                copy paste cells, drag and drop excel file or manual data creation.
                                            </Typography>
                                        }>
                                        <InfoIcon color='primary' />
                                    </Tooltip>
                                </>
                            } />
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
            nextBtnLabel={ 'Next' }
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
    }
}

export default ImportTable