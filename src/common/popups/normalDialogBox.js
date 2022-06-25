import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const NormalDialogBox = (props) => {

    const handleClose = () => {
        if (props.onClose) props.onClose()
    }

    return (
        <Dialog
            fullWidth={ Boolean(props.fullWidth) }
            maxWidth={ props.maxWidth? props.maxWidth: 'xs' }
            open={ Boolean(props.open) }
            onClose={(e) => {
                if (!props.strictClose) handleClose()
            }}>
            <DialogTitle color={ props.color? props.color: 'primary' }>{ props.title? props.title: '' }</DialogTitle>
            <DialogContent>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                    }}>
                    { props.children }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose }>Close</Button>
                {
                    props.actions? props.actions: null
                }
            </DialogActions>
      </Dialog>
    )
}

export default NormalDialogBox