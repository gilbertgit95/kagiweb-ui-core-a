import React from 'react';
import { useState } from 'react'
import { TextField, TextFieldProps } from '@mui/material'

const timeInSec = 1

interface IProps {
    delayedchange: (val:string) => void
}

const DebouncingTextField = (props:TextFieldProps & IProps) => {
    const [time, setTime] = useState<NodeJS.Timeout|undefined>(undefined)

    const change = (val:string) => {

        if (time) clearTimeout(time)

        setTime(
            setTimeout(() => {
                if (props.delayedchange) props.delayedchange(val)
            }, timeInSec * 1e3)
        )
    }

    return (
        <TextField
            {...{...props, ...{delayedchange: undefined}}}
            onChange={e => change(e.target.value || '')} />
    )
}

export default DebouncingTextField