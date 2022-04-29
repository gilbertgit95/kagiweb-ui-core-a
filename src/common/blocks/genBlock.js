import Box from '@mui/material/Box'
import WebhookIcon from '@mui/icons-material/Webhook'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

const GenBlockComponent = (props) => {
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
                        {
                            props.title?  (
                                <Typography
                                    variant='h6'
                                    color='primary'   
                                    id={props.title.replace(/\s/g, '').toLowerCase()}
                                    style={{marginBottom: 5}}>
                                    <WebhookIcon size='small' /> <span>{ props.title }</span>
                                </Typography>
                            ): null
                        }
                        { props.description?  <Typography variant='body1' style={{marginBottom: 15, textIndent: 50}}>{ props.description }</Typography>: null }
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

export default GenBlockComponent