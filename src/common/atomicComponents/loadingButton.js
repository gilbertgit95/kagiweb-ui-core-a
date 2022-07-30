import React from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingButton = (props) => {

    let properties = {}

    // properties not tobe included
    let xProps = new Set(['isLoading'])

    // assign object properties
    Object.keys(props).forEach(key => {
        if (xProps.has(key)) return
        properties[key] = props[key]
    })

    // start icon
    let startIcon = props.startIcon? props.startIcon: null

    // if isLoading is true, set disabled to true
    if (props.isLoading) {
        startIcon = <CircularProgress size={12} />
        properties.disabled = true
    }

    return (
        <Button
            {...properties}
            startIcon={ startIcon }>
            { props.children? props.children: '' }
        </Button>
    )
}

export default LoadingButton