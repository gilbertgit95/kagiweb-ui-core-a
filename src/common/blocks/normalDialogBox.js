import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const NormalModalBox = (props) => {

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
            <DialogTitle>{ props.title? props.title: '' }</DialogTitle>
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
                <Button variant='contained' onClick={ handleClose }>Proceed</Button>
            </DialogActions>
      </Dialog>
    )
}

export default NormalModalBox