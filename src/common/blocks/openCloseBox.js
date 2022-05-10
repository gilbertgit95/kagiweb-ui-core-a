import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const OpenCloseBox = (props) => {

    return (
        props.isOpen? (
            <Box>
                <Box style={{ position: 'relative' }}>
                    <IconButton
                        style={{
                            zIndex: 1,
                            position: 'absolute',
                            left: 'calc(100% - 30px)',
                            top: 0
                        }}
                        aria-label='close'
                        onClick={() => {
                            if (props.onClose && typeof props.onClose === 'function') {
                                props.onClose()
                            }
                        }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                { props.children }
            </Box>
        ): (
            <Button
                color='primary'
                variant='contained'
                onClick={() => {
                    if (props.onOpen && typeof props.onOpen === 'function') {
                        props.onOpen()
                    }
                }}>
                { props.btnIcon? props.btnIcon: null }
                { props.btnLabel? props.btnLabel: 'Open' }
            </Button>
        )
    )
}

export default OpenCloseBox