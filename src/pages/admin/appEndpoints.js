import { useState, useEffect } from 'react'
import subpages from './lib/subPages'

import SubPageslayout from '../../common/layouts/subPagesLayout'

// import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
// import LoginIcon from '@mui/icons-material/Login'
// import Button from '@mui/material/Button'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import AddIcon from '@mui/icons-material/Add'
import ImportData from '../../common/inputs/importData'
import FullScreenDialogBox from '../../common/blocks/fullScreenDialogBox'
import { Button } from '@mui/material'
// import AccountContext from '../../common/contexts/accountContext'

const AppEndpoints = (props) => {
    const [states, setStates] = useState({
        isLoading: true,
        itemDialogMode: 'add', // add || edit
        itemDialog: false,
        bulkImportDialog: false,
    })

    useEffect(() => {
        const fetchData = () => {
            setStates({...states, ...{ ioLoading: true }})
            setTimeout(() => {
                setStates({...states, ...{ ioLoading: false }})
            }, 1000)
        }

        fetchData()
    }, [])

    return (
        <SubPageslayout
            navAnchor={'left'}
            navMenu={subpages}>
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <Button
                        color='primary'
                        variant='contained'
                        startIcon={ <AddIcon /> }
                        onClick={() => {
                            setStates({...states, ...{ itemDialog: true }})
                        }}>Add</Button>
                    <Button
                        color='primary'
                        variant='contained'
                        startIcon={ <ImportExportIcon /> }
                        onClick={() => {
                            setStates({...states, ...{ bulkImportDialog: true }})
                        }}>Import Data</Button>
                    <FullScreenDialogBox
                        title={ states.itemDialogMode === 'add'? 'Add Endpoint': 'Edit Endpoint' }
                        open={ states.itemDialog }
                        onClose={() => {
                            setStates({...states, ...{ itemDialog: false }})
                        }}>
                        <Container maxWidth="lg">
                            
                        </Container>
                    </FullScreenDialogBox>
                    <FullScreenDialogBox
                        title={ 'Import from Excel' }
                        open={ states.bulkImportDialog }
                        onClose={() => {
                            setStates({...states, ...{ bulkImportDialog: false }})
                        }}>
                        <Container
                            style={{ marginTop: 20 }}
                            maxWidth="lg">
                            <ImportData
                                // headers={['Endpoint', 'Name', 'Type', 'Category', 'Subcategory']} />
                                headers={['name', 'calories', 'fat', 'carb', 'protein']} />
                        </Container>
                    </FullScreenDialogBox>
                </Container>
            </Grid>
        </SubPageslayout>
    )
}

export default AppEndpoints