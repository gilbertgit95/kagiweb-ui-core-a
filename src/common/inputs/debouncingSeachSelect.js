import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

const timeout = 0.5 // in seconds

const filterList = (searckKey = '', list = []) => {
    searckKey = searckKey.toLowerCase()

    return list
        .filter(item => item.label.toLowerCase().indexOf(searckKey) >= 0)
        .slice(0, 10)
}

const DebouncingSeachSelect = (props) => {
    const [states, setStates] = useState({
        selected: '',
        searchKey: '',
        timer: null,
        list: []
    })
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)

    const searchBoxClick = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen((prev) => !prev)
    };


    const onChange = (e) => {
        let searchKey = e && e.target && e.target.value? e.target.value: ''
        let filteredList = filterList(searchKey, props.list)
        let timer = states.timer

        setAnchorEl(e.currentTarget)
        setOpen((prev) => !prev)

        // clear timeout if it exist
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            setStates({...states, ...{list: filteredList, searchKey}})
        }, timeout * 1e3)

        // console.log(searchKey)

        setStates({...states, ...{ searchKey, timer }})
    }

    useEffect(() => {
        let searchKey = states.searchKey
        let filteredList = filterList(searchKey, props.list)

        setStates({...states, ...{list: filteredList}})
        console.log('lifecycle')
    }, [props.list])

    return (
        <Box style={{position: 'relative', top: 0}} onBlur={(e) => { setOpen(false) }}>
            <TextField {...props} value={states.searchKey} onChange={onChange} onClick={searchBoxClick} />
            <Popper open={open} anchorEl={anchorEl} placement='bottom-start' transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <MenuList>
                                {
                                    states.list? states.list.map(item => (
                                        <MenuItem
                                            key={item.value + '_' + item.label}
                                            onClick={(e) => {
                                                setStates({...states, ...{
                                                    searchKey: item.label,
                                                    selected: item.value
                                                }})
                                                console.log('selected: ', item)
                                            }}>
                                            {/* <ListItemIcon>
                                                <ContentCut fontSize="small" />
                                            </ListItemIcon> */}
                                            <ListItemText>{ item.label }</ListItemText>
                                            {/* <Typography variant="body2" color="text.secondary">
                                                ⌘X
                                            </Typography> */}
                                        </MenuItem>
                                    )): null
                                }
                            </MenuList>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    )
}

export default DebouncingSeachSelect