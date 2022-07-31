import { useState } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const LoadingImg = (props) => {
    const [states, setStates] = useState({
        isLoading: true,
        hasError: false
    })

    return (
        <Box style={{ position:  'relative' }}>
            { states.isLoading? (
                <>
                    <Box
                        style={{
                            position: 'absolute',
                            textAlign: 'center',
                            width: '100%',
                            height: '100%',
                            padding: '40%'
                        }}>
                        <CircularProgress component='div' />
                        <Typography component='div' variant='caption' style={{width: '100%'}}>Loading image...</Typography>
                    </Box>
                    <Box style={{ 
                        width: '40%',
                        padding: '40%',
                        boxSizing: 'border-box',
                        position:'relative',
                    }}>
                    </Box>
                </>
            ): null }
            <img
                { ...props }
                { ...{
                    style: {
                        ...{display: states.isLoading? 'none': 'block'},
                        ...(props.style? props.style: {})
                    },
                }}
                onLoad={(e) => {
                    setStates({...states, ...{ isLoading: false }})
                }}
                onError={(e) => {
                    setStates({...states, ...{ hasError: true, isLoading: false }})
                }} />
            
        </Box>
    )
}

export default LoadingImg