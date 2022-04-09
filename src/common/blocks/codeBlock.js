import { useContext } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import LocalStorageContext from '../context/localStorageContext'
import { CodeBlock, vs2015, atomOneLight } from "react-code-blocks"
// import CircularProgress from '@mui/material/CircularProgress'

const CodeBlockComponent = (props) => {
    const {localStorageContext} = useContext(LocalStorageContext)

    let themeMode = localStorageContext.themeMode
    let defaultTheme = themeMode === 'dark'? vs2015: atomOneLight

    let isLoading = typeof props.isLoading === 'boolean'? props.isLoading: false
    
    return (
        <Box
            style={{
                ...{marginTop: 20, marginBottom: 20},
                ...(props.style? props.style: {})
            }}>
            {
                !isLoading? (
                    <>
                        { props.title?  <Typography variant='h6' style={{marginBottom: 5}}>{ props.title }</Typography>: null }
                        { props.description?  <Typography variant='body1' style={{marginBottom: 15}}>{ props.description }</Typography>: null }
                        <CodeBlock
                            text={props.code? props.code: ''}
                            language={props.language? props.language: 'javascript'}
                            showLineNumbers={Boolean(props.showLineNumbers)}
                            theme={props.theme? props.theme: defaultTheme} />
                    </>
                ): (
                    <>
                        <Typography
                            component="div"
                            variant="h3">
                            <Skeleton
                                animation="wave"
                                style={{width: 200}} />
                        </Typography>
                        <Typography
                            component="div"
                            variant="caption">
                            <Skeleton
                                animation="wave" />
                        </Typography>
                        <Typography
                            component="div"
                            variant="caption">
                            <Skeleton
                                animation="wave"
                                style={{ width: '85%'}} />
                        </Typography>
                        <Skeleton
                            animation="wave"
                            variant='rectangular'
                            style={{height: 150, marginTop: 10}}>
                        </Skeleton>
                    </>
                )
            }
        </Box>
    )
}

export default CodeBlockComponent