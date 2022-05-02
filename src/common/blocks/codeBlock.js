import { useContext } from 'react'
import Box from '@mui/material/Box'
import WebhookIcon from '@mui/icons-material/Webhook'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import LocalStorageContext from '../contexts/localStorageContext'
import { CodeBlock, vs2015, atomOneLight } from "react-code-blocks"

const CodeBlockComponent = (props) => {
    const {localStorageContext} = useContext(LocalStorageContext)

    let themeMode = localStorageContext.themeMode
    let defaultTheme = themeMode === 'dark'? vs2015: atomOneLight

    let isLoading = typeof props.isLoading === 'boolean'? props.isLoading: false
    
    return (
        <Box
            style={{
                ...{marginBottom: 20, textAlign: 'left'},
                ...(props.style? props.style: {})
            }}>
            {
                !isLoading? (
                    <>
                        {/* the title section */}
                        {
                            props.title?  (
                                <Typography
                                    variant='h6'
                                    color='primary'
                                    id={props.title.replace(/\s/g, '').toLowerCase()}
                                    style={{marginBottom: 5}}>
                                    <WebhookIcon size='small' /><span>{ props.title }</span>
                                </Typography>
                            ): null
                        }

                        {/* the description section */}
                        {
                            props.description? (
                                <Typography
                                    variant='body1'
                                    style={{marginBottom: 15, textIndent: 50}}>
                                    { props.description }
                                </Typography>
                            ): null
                        }

                        {/* the rendered section */}
                        {
                            props.rendered? (
                                <>
                                    <Typography
                                        style={{
                                            fontStyle: 'italic',
                                            display: 'block'
                                        }}
                                        variant='caption'>Rendered Sample:</Typography>
                                    <Box style={{padding: 20}}>
                                        { props.rendered }
                                    </Box>
                                </>
                            ): null
                        }

                        {/* the code block section */}
                        {
                            props.code? (
                                <CodeBlock
                                    text={props.code}
                                    language={props.language? props.language: 'javascript'}
                                    showLineNumbers={Boolean(props.showLineNumbers)}
                                    theme={props.theme? props.theme: defaultTheme} />
                            ): null
                        }

                        {/* the children content section */}
                        {
                            props.children? (
                                <Box style={{marginTop: 10}}>
                                    { props.children }
                                </Box>
                            ): null
                        }
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