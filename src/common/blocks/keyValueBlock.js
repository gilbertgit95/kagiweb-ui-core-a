import React from 'react'
import { NoEncryption } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

const KeyValueBlock = (props) => {
    let data = props.data? props.data: []
    let style = props.style? props.style: {}

    return (
        <Grid
            style={{...{ marginBottom: 20 }, ...style}}
            container>
            {
                data.map((row, rowIndex) => {
                    return (
                        <React.Fragment key={ 'row_' + rowIndex }>
                            <Grid
                                item xs={4}
                                style={{ padding: 5 }}>
                                <Box>
                                    <Typography
                                        color='primary'
                                        variant='body1'>
                                        { row.key }
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid
                                item xs={8}
                                style={{ padding: 5 }}>
                                <Box 
                                    style={{
                                        maxWidth: '100%',
                                        overflow: 'auto',
                                        padding: 5
                                    }}>
                                    <Typography
                                        component='div'
                                        variant='body1'>
                                        { row.value }
                                    </Typography>
                                </Box>
                            </Grid>
                        </React.Fragment>
                    )
                })
            }
            
        </Grid>
    )
}

export default KeyValueBlock