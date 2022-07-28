import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const GenProfile = (props) => {
    return (
        <Box>
            <Typography
                style={{ fontWeight: 700, fontSize: 14 }}
                component='div' variant='overline'>
                { props.title? props.title: '' }
            </Typography>
            <Typography
                style={{ fontSize: 14 }}
                color='primary'
                component='div' variant='overline'>
                { props.subtitle? props.subtitle: '' }
            </Typography>
            <Typography
                component='div' variant='body1'>
                { props.description? props.description: '' }
            </Typography>

            {/* child content */}
            { props.children? props.children: null }

            {/* links */}
            <Box>
                {
                    props.links? props.links.map(link => {
                        return (
                            <Typography
                                style={{ marginRight: 10 }}
                                key={ link.label }
                                color='primary'
                                target='_blank'
                                href={ link.value }
                                component='a' variant='overline'>
                                { link.label }
                            </Typography>
                        )
                    }): null
                }
            </Box>
        </Box>
    )
}

export default GenProfile