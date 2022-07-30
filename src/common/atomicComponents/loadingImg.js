import { useState } from 'react'
import { Box, CircularProgress } from '@mui/material'

const LoadingImg = (props) => {
    const [states, setStates] = useState({
        isLoading: true,
        hasError: false
    })

    return (
        <Box style={{ position:  'relative' }}>
            { states.isLoading? (
                <Box
                    style={{
                        position: 'absolute',
                        textAlign: 'center',
                        width: '100%',
                        height: '100%',
                        padding: '40%'
                    }}>
                    <CircularProgress />
                </Box>
            ): null }
            <img
                { ...props }
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