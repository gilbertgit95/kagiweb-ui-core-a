import { useState } from 'react'
import { TextField, TextFieldProps } from '@mui/material'

const timeInSec = 2

interface IProps {
    delayedChange: (val:string) => void
}

const DebouncingTextField = (props:TextFieldProps & IProps) => {
    const [time, setTime] = useState<NodeJS.Timeout|undefined>(undefined)

    const change = (val:string) => {

        if (time) clearTimeout(time)

        setTime(
            setTimeout(() => {
                if (props.delayedChange) props.delayedChange(val)
            }, timeInSec * 1e3)
        )
    }

    return (
        <TextField
            {...{...props, ...{delayedChange: undefined}}}
            onChange={e => change(e.target.value || '')} />
    )
}

export default DebouncingTextField