import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

const timeout = 1 // in seconds

const DebouncingSeachSelect = (props) => {
    const [states, setStates] = useState({
        value: '',
        timer: null
    })
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen((prev) => !prev)
    };


    const onChange = (e) => {
        let value = e && e.target && e.target.value? e.target.value: ''
        let timer = states.timer

        // clear timeout if it exist
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            if (props.onChange) props.onChange(value)
        }, timeout * 1e3)

        setStates({...states, ...{ value, timer }})
    }

    return (
        <Box style={{position: 'relative', top: 0}}>
            <TextField {...props} onChange={onChange} onClick={handleClick} />
            <Popper open={open} anchorEl={anchorEl} placement='bottom-start' transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{zIndex: 100}}>
                            <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    )
}

export default DebouncingSeachSelect