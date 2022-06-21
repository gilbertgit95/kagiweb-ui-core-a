import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Transition from '../animations/transition'
import { styled } from '@mui/material/styles'

const DialogContainer = styled(Dialog)(({ theme }) => {
    return {
        '.MuiDialog-paper': {
            background: theme.palette.background.default
        }
    }
});

const DialogBox = (props) => {
    const handleClose = () => {
        if (props.onClose) props.onClose()
    }

    return (
        <>
            <DialogContainer
                fullScreen
                open={ Boolean(props.open) }
                onClose={ handleClose }
                TransitionComponent={ Transition }>
                <AppBar
                    sx={{
                        position: 'relative',
                        boxShadow: 'none'
                    }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={ handleClose }
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            { props.title? props.title: '' }
                        </Typography>
                        {/* <Button autoFocus color="inherit" onClick={ handleClose }>
                            save
                        </Button> */}
                    </Toolbar>
                </AppBar>
                { props.children }
            </DialogContainer>
        </>
    )
}

export default DialogBox