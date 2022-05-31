import { useState } from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
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
        ]
    })
    // const uploadFile = useRef()
    // const theme = useTheme()

    // useEffect(() => {
    //     setStates({...states, ...{ rowsProps: props.headers }})
    // }, [])

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
                            <ExcelImport
                                headers={ props.headers }
                                onDataImported={(data) => {
                                    console.log('Imported data: ', data)
                                    setStates({ ...states, ...{ importBox: false } })
                                }} />
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
    }
}

export default ImportTable