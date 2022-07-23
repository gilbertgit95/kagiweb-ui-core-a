import { useState, useContext } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import WarningIcon from '@mui/icons-material/Warning'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ClearIcon from '@mui/icons-material/Clear'
// import DeleteIcon from '@mui/icons-material/Delete;
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import RuleIcon from '@mui/icons-material/Rule'
import InfoIcon from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip'

import HorizontalStepsNav from '../navs/horizontalStepsNav'
import InteractiveTable from '../tables/interactiveTable'
import BasicTable from '../tables/basicTable'
import OpenCloseBox from '../blocks/openCloseBox'
import ExcelImport from './excelImport'

import GlobalDialogContext from '../contexts/globalDialogContext'
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
    const globalDialogCtx = useContext(GlobalDialogContext)
    const [states, setStates] = useState({
        importMode: 'add', // add || change
        importMethod: 'uploadCSV', // uploadCSV || copyPaste || dragAndDrop || createEmptyCells
        importBox: true,

        importedData: [],
        modifyData: [],
        savedData: [],

        modifySelected: []
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
            action: async () => {
                // clone th list
                let newList = JSON.parse(JSON.stringify(states.importedData))

                // console.log('next from import to modify')

                if (!(newList && newList.length)) {
                    let result = await globalDialogCtx.showDialog({
                        title: 'Alert',
                        type: 'alert',
                        color: 'secondary',
                        message: 'No data to modify please add or import data before proceeding.'
                    })

                    return false
                }

                setStates({...states, ...{
                    modifyData: newList.map((item, index) => {
                        item.eval = {
                            error: null
                        }
                        item.id = index
                        return item
                    }),
                    modifySelected: []
                }})

                return true
            }
        },
        {
            icon: null,
            title: 'Modify And Evaluate',
            component: (
                <Grid container spacing={2}>
                    <Grid item xs={12} style={ styles.container }>
                        <InteractiveTable
                            hasCheckBox={ true }
                            headers={
                                [
                                    ...props.headers.map(item => ({
                                        isEditable: true,
                                        label: item,
                                        field: item,
                                        type: 'string'
                                    })),
                                    ...[
                                        {
                                            label: 'Evaluation',
                                            field: 'eval',
                                            width: 30,
                                            render: (renderProps = {}, cellData = {}) => {
                                                // console.log(cellData)
                                                return (
                                                    // <WarningIcon size='small' color='secondary' />
                                                    <TaskAltIcon
                                                        // style={{
                                                        //     width: 15,
                                                        //     height: 15
                                                        // }}
                                                        size='small'
                                                        color='primary' />
                                                )
                                            },
                                            type: 'component'
                                        }
                                    ]
                                ]
                            }
                            rows={ states.modifyData }
                            onChange={(row, col, value) => {
                                // console.log(row, col, value)
                                let newList = states.modifyData.map(item => {
                                    if (row.id === item.id) {
                                        item[col.field] = value
                                    }
                                    return item
                                })
                                setStates({...states, ...{ modifyData: newList}})
                            }}
                            onSelect={(selected) => {
                                setStates({...states, ...{ modifySelected: selected}})
                            }}
                            rightSideComponents={
                                <>
                                    <Button
                                        style={{ marginLeft: 5 }}
                                        color='primary'
                                        variant='outlined'
                                        startIcon={<ClearIcon />}
                                        onClick={async () => {
                                            if (!states.modifySelected.length) {
                            
                                                let msg = 'Please select items to remove.'

                                                let result = await globalDialogCtx.showDialog({
                                                    title: 'Alert',
                                                    type: 'alert',
                                                    message: msg
                                                })

                                            } else {
                                                let tobeDeletedSet = new Set(states.modifySelected)
                                                let newList = states.modifyData.filter(item => {
                                                    return !tobeDeletedSet.has(item.id)
                                                })
                                                setStates({...states, ...{ modifyData: newList }})
                                            }
                                        }}>
                                        Remove Selected
                                    </Button>
                                    <Button
                                        style={{ marginLeft: 5 }}
                                        color='primary'
                                        variant='contained'
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            let data = {}
                                            let length = states.modifyData.length
                                            let lastIndex = length? states.modifyData[length - 1].id: 0
                                            
                                            props.headers.forEach(item => {
                                                data[item] = ''
                                            })
                                            // condition for the new data id
                                            if (length > lastIndex + 1) {
                                                data.id = length
                                            } else {
                                                data.id = lastIndex + 1
                                            }

                                            let newList = states.modifyData
                                            newList.unshift(data)

                                            setStates({...states, ...{ modifyData: newList}})
                                        }}>
                                        Add Row
                                    </Button>
                                    <Button
                                        style={{ marginLeft: 5 }}
                                        color='primary'
                                        variant='contained'
                                        startIcon={<RuleIcon />}
                                        onClick={async () => {
                                            console.log('evaluate data')
                                        }}>
                                        Evaluate Data
                                    </Button>
                                    <Tooltip
                                        style={{ float: 'right' }}
                                        placement='bottom-end'
                                        title={
                                            <Typography
                                                style={{ padding: 10 }}
                                                variant='body1'>
                                                Modify or fix wrong data before proceeding to evaluation and saving.
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
                // clone th list
                let newList = JSON.parse(JSON.stringify(states.modifyData))

                // save data to database
                await utils.waitFor(2)
                setStates({...states, ...{
                    savedData: newList
                }})
                return true
            }
        }
    ]

    let finalView = {
        component: (
            <Grid container spacing={2}>
                <Grid item xs={12} style={ styles.container }>
                    <BasicTable
                        headers={ props.headers }
                        rows={ states.savedData }
                        rightSideComponents={
                            <>
                                <Tooltip
                                    style={{ float: 'right' }}
                                    placement='bottom-end'
                                    title={
                                        <Typography
                                            style={{ padding: 10 }}
                                            variant='body1'>
                                            The list below are successfully saved in the database.
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

            // test for notifications
            // this will also serve as reference
            // await utils.waitFor(2)
            // console.log('finish button')
            if (props.onClose) props.onClose()

            return true
        }
    }

    return (
        <HorizontalStepsNav
            nextBtnLabel={ 'Next' }
            finishBtnLabel={ 'Save' }
            finalBtnLabel={ 'Close' }
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