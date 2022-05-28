import { useState } from 'react'
import TextField from '@mui/material/TextField'

const timeout = 1 // in seconds

const DebouncingTextField = (props) => {
    const [states, setStates] = useState({
        value: '',
        timer: null
    })

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

    return <TextField {...props} onChange={onChange} />
}

export default DebouncingTextField